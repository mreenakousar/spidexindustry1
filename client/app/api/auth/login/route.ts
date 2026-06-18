import { NextResponse } from "next/server";
import * as z from "zod";
import { loginAction } from "../../../../src/actions/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);
    const result = await loginAction(parsed);
    return NextResponse.json(result, { status: result.ok ? 200 : 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unable to login." }, { status: 400 });
  }
}
