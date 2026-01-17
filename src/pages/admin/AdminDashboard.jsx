import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [manufacturerCount, setManufacturerCount] = useState(0)
  const [retailerCount, setRetailerCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCounts()
  }, [])

  async function loadCounts() {
    try {
      setLoading(true)

      const { count: mCount } = await supabase
        .from("manufacturers")
        .select("*", { count: "exact", head: true })

      const { count: rCount } = await supabase
        .from("retailers")
        .select("*", { count: "exact", head: true })

      setManufacturerCount(mCount || 0)
      setRetailerCount(rCount || 0)
    } catch (err) {
      console.error("Count load error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-500">Loading dashboard...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Welcome Raj 👋 Manage your business data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Manufacturers */}
        <div
          onClick={() => navigate("/admin/manufacturers")}
          className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg transition border hover:border-blue-300"
        >
          <p className="text-slate-500 text-sm">Manufacturers</p>
          <p className="text-4xl font-bold text-blue-900 mt-2">
            {manufacturerCount}
          </p>
          <p className="text-sm text-blue-700 mt-3">
            Click to manage →
          </p>
        </div>

        {/* Retailers */}
        <div
          onClick={() => navigate("/admin/retailers")}
          className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg transition border hover:border-blue-300"
        >
          <p className="text-slate-500 text-sm">Retailers</p>
          <p className="text-4xl font-bold text-blue-900 mt-2">
            {retailerCount}
          </p>
          <p className="text-sm text-blue-700 mt-3">
            Click to manage →
          </p>
        </div>

      </div>
    </div>
  )
}
