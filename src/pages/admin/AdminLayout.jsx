import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function AdminLayout() {
  const navigate = useNavigate()

  async function logout() {
    await supabase.auth.signOut()
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold text-blue-900 mb-6">
          Raj Agencies Admin
        </h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/manufacturers"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Manufacturers
          </NavLink>

          <NavLink
            to="/admin/retailers"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium opacity-60`
            }
          >
            Retailers (Soon)
          </NavLink>

          <button
            onClick={logout}
            className="mt-6 text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
