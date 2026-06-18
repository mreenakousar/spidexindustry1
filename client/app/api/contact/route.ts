import { NextResponse } from 'next/server'
import * as z from 'zod'
import { submitContactAction } from '../../../src/actions/contact'

const schema = z.object({ name: z.string().min(1), email: z.string().email(), subject: z.string().optional(), message: z.string().min(1) })

export async function POST(req: Request){
  try{
    const body = await req.json()
    const parsed = schema.parse(body)
    const result = await submitContactAction(parsed)
    return NextResponse.json(result, { status: result.ok ? 200 : 400 })
  }catch(err:any){
    console.error('Contact error', err)
    return NextResponse.json({ error: err?.message || 'Invalid' }, { status: 400 })
  }
}
