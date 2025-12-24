import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";
import { NextResponse } from "next/server";
type RouteContext = { params: Promise<{ id: string }> };

// export async function DELETE(req: Request, { params }: RouteContext) {
//   const { id } = await params;

//   try {
//     const response = await apiServer.delete(
//       `/doctor/qualifications-delete/${id}`
//     );

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error("Error deleting qualification:", error);
//     return handleApiError(error);
//   }
// }
export async function DELETE(req: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await req.json(); // ✅ read body

  try {
    const response = await apiServer.delete(
      `/doctor/qualifications-delete/${id}`,
      {
        data: body, // ✅ forward doctorId
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error deleting qualification:", error);
    return handleApiError(error);
  }
}
