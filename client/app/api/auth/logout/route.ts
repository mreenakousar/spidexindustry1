import { NextResponse } from "next/server";
import { logoutAction } from "../../../../src/actions/auth";

export async function POST() {
  const result = await logoutAction();
  return NextResponse.json(result);
}
