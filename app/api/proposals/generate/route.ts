import { NextResponse } from 'next/server'
import { generatePDF } from '@/lib/pdf'

export async function POST(req: Request) {
  const { customerName, address, issue } = await req.json()

  // Call Grok-4 for the content
  const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: `You are an elite HVAC sales closer. Write a professional Good/Better/Best proposal for:
Name: ${customerName}
Address: ${address}
Issue: ${issue}

Include 3 options with pricing, benefits, and urgency. Make it persuasive but honest. Use real 2025 pricing.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1200,
    }),
  })

  const grokData = await grokRes.json()
  const proposalText = grokData.choices?.[0]?.message?.content || 'Error generating proposal.'

  const pdfBytes = await generatePDF(proposalText, customerName)

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${customerName}_Proposal.pdf"`,
    },
  })
}
