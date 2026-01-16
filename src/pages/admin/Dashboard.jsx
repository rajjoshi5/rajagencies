import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data } = await supabase.auth.getUser()

    if (!data?.user) {
      window.location.href = "/admin/login"
    } else {
      setUser(data.user)
      setLoading(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading) {
    return <div className="p-10">Checking authentication...</div>
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome, {user.email} 👋
        </p>

        <button
          onClick={logout}
          className="mt-6 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>

        <div className="mt-10 text-slate-500">
          🚧 Admin features coming soon...
        </div>
      </div>
    </div>
  )
}
