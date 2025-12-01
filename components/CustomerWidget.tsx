'use client'

import { useSearchParams } from 'next/navigation'
import Diagnose from '@/app/dashboard/diagnose/page' // Reuse the same component

export default function CustomerWidget() {
  const params = useSearchParams()
  const company = params.get('company') || 'Unknown HVAC Co'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4">
          {company} – Instant HVAC Help
        </h1>
        <p className="text-xl text-white text-center mb-12">
          Describe your problem or upload a photo – get an answer in seconds.
        </p>
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <Diagnose />
        </div>
      </div>
    </div>
  )
}
