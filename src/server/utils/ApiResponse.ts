import { NextResponse } from "next/server";

export const ApiSuccess = (status = 200, message = "Success", data: unknown = {}) => {
    return NextResponse.json(
      {
        success: true,
        status,
        message,
        data,
      },
      { status }
    );
  };