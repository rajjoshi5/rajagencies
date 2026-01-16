import { lazy, Suspense } from "react"

const Hero = lazy(() => import("./components/Hero"))
const Overview = lazy(() => import("./components/Overview"))
const Stats = lazy(() => import("./components/Stats"))
const Expertise = lazy(() => import("./components/Expertise"))
const Values = lazy(() => import("./components/Values"))
const Contact = lazy(() => import("./components/Contact"))
const Navbar = lazy(() => import("./components/Navbar"))
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat"))

export default function App() {
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
