
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_BASE_URL = "doctor/update-leave";

  try {
    const body = await req.json();
    const response = await apiServer.post(API_BASE_URL, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
