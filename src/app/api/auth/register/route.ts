import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/server/models/User';
import { ApiSuccess } from '@/server/utils/ApiResponse';
import { ApiError } from '@/server/utils/ApiError';
import { connectToDatabase } from '@/server/db/db';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, password, fullName, username } = body;

    if (!email || !password || !fullName) {
      return ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiError(400, 'User with this email already exists');
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return ApiError(400, 'User with this username already exists');
    }

    const provider = {
      type: 'credentials',
      name: 'credentials'
    };

    const user = await User.create({
      email,
      password,
      fullName,
      provider,
      username
    });

    if (!user) {
      return ApiError(400, 'Failed to create user');
    }
  
    return ApiSuccess(201, "Registration Successful!", {});
    
  } catch (error) {
    return ApiError(500, "Registration Error", error); 
  }
}
