import { NextResponse } from "next/server";

export const ApiError = (status = 400, message = "Something went wrong", errors: unknown = undefined) => {
  return NextResponse.json(
    {
      success: false,
      status,
      message,
      errors,
    },
    { status }
  );
};