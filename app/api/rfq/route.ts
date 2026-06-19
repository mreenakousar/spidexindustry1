import { NextResponse } from 'next/server'
import * as z from 'zod'
import { submitRfqAction } from '../../../src/actions/rfq'

const schema = z.object({
  fullName: z.string().min(2),
  brandName: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  productType: z.string().min(1),
  quantity: z.number().min(1),
  fabricType: z.string().optional(),
  printingMethod: z.string().optional(),
  notes: z.string().optional()
})

export async function POST(req: Request){
  try{
    const body = await req.json()
    const parsed = schema.parse({ ...body, quantity: Number(body.quantity) })
    const result = await submitRfqAction(parsed)
    return NextResponse.json(result, { status: result.ok ? 200 : 400 })
  }catch(err:any){
    console.error('RFQ error', err)
    return NextResponse.json({ error: err?.message || 'Invalid' }, { status: 400 })
  }
}
