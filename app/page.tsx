'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { loadStripe } from '@stripe/stripe-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Home() {
  const [spotsLeft, setSpotsLeft] = useState<number>(50)
  const [loading, setLoading] = useState(true)

  const fetchCount = async () => {
    const { count } = await supabase
      .from('founding_members')
      .select('*', { count: 'exact', head: true })

    const left = 50 - (count || 0)
    setSpotsLeft(left)
    setLoading(false)
  }

  useEffect(() => {
    fetchCount()

    const channel = supabase
      .channel('founding-count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'founding_members' }, fetchCount)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleCheckout = async () => {
    const stripe = await stripePromise
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { sessionId } = await res.json()
    stripe?.redirectToCheckout({ sessionId })
  }

  const soldOut = spotsLeft <= 0

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center space-y-12">
        <h1 className="text-6xl md:text-7xl font-black text-gray-900">
          HVAC Flow Pro
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700">
          AI Diagnosis • Proposals • Compliance • Booking • Portal • QuickBooks • SMS
        </p>

        {/* LIVE COUNTER */}
        <div className="bg-black text-white py-12 px-8 rounded-2xl">
          {loading ? (
            <p className="text-4xl">Loading...</p>
          ) : soldOut ? (
            <p className="text-6xl font-black">SOLD OUT FOREVER</p>
          ) : (
            <>
              <p className="text-7xl font-black">{spotsLeft}</p>
              <p className="text-3xl mt-4">Founding Spots Left</p>
              <p className="text-xl mt-2 opacity-90">Lifetime Pro Access – $990/year forever</p>
            </>
          )}
        </div>

        {/* CHECKOUT BUTTON */}
        {!soldOut && (
          <button
            onClick={handleCheckout}
            className="w-full max-w-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-3xl py-8 rounded-2xl transition shadow-2xl"
          >
            Claim My Founding Spot Now
          </button>
        )}

        <p className="text-lg text-gray-600 mt-16">
          First 50 only. Never available again at this price.
        </p>
      </div>
    </main>
  )
}
