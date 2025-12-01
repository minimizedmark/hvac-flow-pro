'use client'

import { useEffect, useState } from 'react'

export default function CustomerPortal({ customerId }: { customerId: string }) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/portal/${customerId}`)
      .then(r => r.json())
      .then(setData)
  }, [customerId])

  if (!data) return <div className="text-center py-20">Loading your portal...</div>

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12">
          Welcome back, {data.name || 'Customer'}!
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Your Service History</h2>
              <ul className="mt-4 space-y-4">
                {data.visits?.map((v: any) => (
                  <li key={v.id} className="bg-gray-50 p-6 rounded-xl">
                    <p className="font-bold">{v.date}</p>
                    <p>{v.description}</p>
                    <p className="text-green-600 font-bold">${v.amount}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Appointment</h2>
              {data.nextVisit ? (
                <div className="bg-blue-50 p-8 rounded-xl mt-4 text-center">
                  <p className="text-4xl font-black">{data.nextVisit.date}</p>
                  <p className="text-xl">{data.nextVisit.time}</p>
                  <p className="text-lg mt-4">{data.nextVisit.tech} will be there</p>
                </div>
              ) : (
                <p className="text-xl mt-4 text-gray-600">No upcoming visits</p>
              )}
            </div>
          </div>

          <div className="text-center pt-8">
            <a href="/widget" className="inline-block bg-black text-white px-12 py-6 rounded-full text-2xl font-bold hover:bg-gray-800">
              Need Help Now? Open Widget
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
