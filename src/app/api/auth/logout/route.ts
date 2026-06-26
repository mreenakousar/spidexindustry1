import { NextResponse } from "next/server";
import { logoutAction } from "@/actions/auth";

export async function POST() {
  const result = await logoutAction();
  return NextResponse.json(result);
}
