import { NextResponse } from "next/server";
import * as z from "zod";
import { signupAction } from "../../../../src/actions/auth";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signupSchema.parse(body);
    const result = await signupAction(parsed);
    return NextResponse.json(result, { status: result.ok ? 200 : 409 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unable to create account." }, { status: 400 });
  }
}
