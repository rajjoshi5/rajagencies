import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"   // ✅ Force redirect to website
  }

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow flex items-center justify-between px-4 py-3">
        <p className="font-bold text-blue-900">
          Raj Agencies Admin
        </p>

        <button
          onClick={() => setOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          top-0 left-0 h-full w-64 bg-white shadow
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-900">
            Raj Agencies Admin
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          <NavLink
            to="/admin"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
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
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
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
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Retailers
          </NavLink>

          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-4"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20 md:pt-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  )
}
