'use client'

import { useState } from 'react'

export default function Proposals() {
  const [customerName, setCustomerName] = useState('')
  const [address, setAddress] = useState('')
  const [issue, setIssue] = useState('')
  const [loading, setLoading] = useState(false)

  const generateProposal = async () => {
    setLoading(true)
    const res = await fetch('/api/proposals/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName, address, issue }),
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${customerName.replace(/\s+/g, '_')}_Proposal.pdf`
    a.click()
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-12 text-center">Good / Better / Best Proposals</h1>

        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8">
          <input
            placeholder="Customer Name"
            className="w-full p-6 border-2 rounded-xl text-2xl"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />
          <input
            placeholder="Service Address"
            className="w-full p-6 border-2 rounded-xl text-2xl"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <textarea
            placeholder="Issue (e.g., AC not cooling, 15-year-old unit)"
            className="w-full h-32 p-6 border-2 rounded-xl text-xl"
            value={issue}
            onChange={e => setIssue(e.target.value)}
          />

          <button
            onClick={generateProposal}
            disabled={loading || !customerName || !issue}
            className="w-full bg-gradient-to-r from-green-600 to-teal-700 text-white py-8 rounded-2xl text-4xl font-black hover:from-green-700 hover:to-teal-800 disabled:opacity-50"
          >
            {loading ? 'Generating PDF...' : 'Generate Good/Better/Best Proposal →'}
          </button>
        </div>
      </div>
    </main>
  )
}
