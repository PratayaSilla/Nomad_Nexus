import { NextRequest } from "next/server";
import { ApiSuccess } from "@/server/utils/ApiResponse";
import { ApiError } from "@/server/utils/ApiError";
import { User } from "@/server/models/User";


export async function GET (req : NextRequest) {
    try {

        const searchParams = req.nextUrl.searchParams;

        const userId = searchParams.get('userId');

        if (!userId) {
            return ApiError(400, 'userId is required')
        }

        const user = await User.findById(userId).select('-password -adhaar -provider -birthDate -location -address')

        if (!user) {
            return ApiError(400, 'Invalid userId')
        }  

        return ApiSuccess(200,"User fetched Successfully !", user)
        
    } catch (error: unknown) {
        let message = 'Failed to fetch trip';
        if (error instanceof Error) {
          message = error.message;
        }
        return ApiError(500, message, error);
      }
    }