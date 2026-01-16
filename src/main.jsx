import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import App from "./App"
import Login from "./pages/admin/Login"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Manufacturers from "./pages/admin/Manufacturers"

import { supabase } from "./lib/supabase"
import "./index.css"

/* -----------------------------
   Protect Admin Routes
----------------------------- */
function ProtectedRoute({ children }) {
  const [loading, setLoading] = React.useState(true)
  const [session, setSession] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="p-10">Loading...</div>

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

/* -----------------------------
   App Router
----------------------------- */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route path="/" element={<App />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Modules */}
          <Route path="manufacturers" element={<Manufacturers />} />

          {/* Future */}
          {/* <Route path="retailers" element={<Retailers />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
