// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import apiServer from "@/utlis/apis/axiosBackendHelper";
// import { handleApiError } from "@/utlis/apis/errorHandler";
// import { parseRequestBody } from "@/utlis/apis/requestHandler";

// type RouteContext = { params: Promise<{ id: string }> };

// export async function DELETE(
//   _: NextRequest,
//   { params }: RouteContext,
//   req: Request
// ) {
//   const { id } = await params;
//   const API_BASE_URL = `/doctor/delete-leave/${id}`;

//   try {
//     const body = await parseRequestBody(req);
//     const response = await apiServer.delete(API_BASE_URL);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ MUST await

  try {
    const body = await request.json(); // { doctorId }

    const response = await apiServer.delete(
      `/doctor/delete-leave/${id}`,
      {
        data: body, // required for axios DELETE
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
