import { NextRequest } from "next/server";
import { ApiError } from "@/server/utils/ApiError";
import { ApiSuccess } from "@/server/utils/ApiResponse";
import { User } from "@/server/models/User";

export async function POST (req: NextRequest) {
    try {

        const body = await req.json();
        
        if (!body.updatedValues) {
            return ApiError(400,'No values recieved')
        }
      
      const update = await User.updateOne({ _id: body._id }, { $set: body.updatedValues })

        if (!update) {
            return ApiError(400,'Error Updating Values')
        }
      
        return ApiSuccess(200,'User Updated Successfully !', update)
        
    } catch (error: unknown) {
        let message = 'Failed to updated User';
        if (error instanceof Error) {
          message = error.message;
        }
        return ApiError(500, message, error);
      }
    }