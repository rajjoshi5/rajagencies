import { lazy, Suspense, useEffect } from "react"
import { supabase } from "./lib/supabase"

const Hero = lazy(() => import("./components/Hero"))
const Overview = lazy(() => import("./components/Overview"))
const Stats = lazy(() => import("./components/Stats"))
const Expertise = lazy(() => import("./components/Expertise"))
const Values = lazy(() => import("./components/Values"))
const Contact = lazy(() => import("./components/Contact"))
const Navbar = lazy(() => import("./components/Navbar"))
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat"))

export default function App() {

  // ✅ Test Supabase connection on app load
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("❌ Supabase error:", error.message)
      } else {
        console.log("✅ Supabase connected successfully:", data)
      }
    })
  }, [])

  return (
    <Suspense fallback={<div className="h-screen" />}>
      <Navbar />
      <Hero />
      <Overview />
      <Stats />
      <Expertise />
      <Values />
      <Contact />
      <WhatsAppFloat />
    </Suspense>
  )
}
