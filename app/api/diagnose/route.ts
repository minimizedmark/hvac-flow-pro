import { NextResponse } from 'next/server'

const XAI_API = 'https://api.x.ai/v1/chat/completions'
const OPENAI_API = 'https://api.openai.com/v1/chat/completions'

export async function POST(req: Request) {
  const { issue, photo } = await req.json()

  const messages: any[] = [
    {
      role: 'system',
      content: `You are HVAC Flow Pro – the most accurate HVAC diagnostic AI in the world.
Answer like a master tech talking to a homeowner: clear, no BS, always end with "Schedule a tech visit to confirm and fix."
Use simple language. Current date: November 2025.`,
    },
    {
      role: 'user',
      content: [
        { type: 'text', text: issue || 'Photo only – diagnose the HVAC issue.' },
        photo ? { type: 'image_url', image_url: { url: photo } } : null,
      ].filter(Boolean),
    },
  ]

  // Try Grok-4 first
  let res = await fetch(XAI_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-beta',
      messages,
      temperature: 0.2,
      max_tokens: 500,
    }),
  })

  // Fallback to GPT-4o if Grok fails or rate-limited
  if (!res.ok) {
    res = await fetch(OPENAI_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.2,
        max_tokens: 500,
      }),
    })
  }

  const data = await res.json()
  const result = data.choices?.[0]?.message?.content || 'Error – could not diagnose.'

  return NextResponse.json({ result })
}
