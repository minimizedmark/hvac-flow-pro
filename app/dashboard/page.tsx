import Link from 'next/link'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-8">Contractor Dashboard</h1>
       
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-600">Founding Member</h2>
            <p className="text-5xl font-black mt-4">#12</p>
            <p className="text-gray-600 mt-2">Lifetime Pro Access</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold">Today's Leads</h2>
            <p className="text-5xl font-black mt-4">7</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold">Revenue This Month</h2>
            <p className="text-5xl font-black mt-4">$18,400</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/dashboard/diagnose" className="block">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-3xl text-center hover:scale-105 transition">
              <h3 className="text-4xl font-black">AI Diagnosis Tool</h3>
              <p className="text-xl mt-4">Voice + Photo → Instant Answer</p>
            </div>
          </Link>

          <Link href="/dashboard/proposals" className="block">
            <div className="bg-gradient-to-br from-green-600 to-teal-700 text-white p-12 rounded-3xl text-center hover:scale-105 transition">
              <h3 className="text-4xl font-black">Good/Better/Best Proposals</h3>
              <p className="text-xl mt-4">Generate PDF in Seconds</p>
            </div>
          </Link>
        </div>

        <Link href="/portal/demo123" className="block">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12 rounded-3xl text-center hover:scale-105 transition mt-8">
            <h3 className="text-4xl font-black">Customer Portal (Live Demo)</h3>
            <p className="text-xl mt-4">See what your clients see</p>
          </div>
        </Link>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-2xl">More tools dropping daily. You’re in early.</p>
        </div>
      </div>
    </main>
  )
}
