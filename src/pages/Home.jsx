import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Overview from "../components/Overview"
import Stats from "../components/Stats"
import Expertise from "../components/Expertise"
import Values from "../components/Values"
import Contact from "../components/Contact"
import WhatsAppFloat from "../components/WhatsAppFloat"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Overview />
      <Stats />
      <Expertise />
      <Values />
      <Contact />
      <WhatsAppFloat />
    </>
  )
}
