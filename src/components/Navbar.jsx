import { useState, useEffect } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("overview")

  const menu = [
    { label: "Overview", id: "overview" },
    { label: "Stats", id: "stats" },
    { label: "Expertise", id: "expertise" },
    { label: "Values", id: "values" },
    { label: "Contact", id: "contact" },
  ]

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    })
    setOpen(false)
  }

function handleLogin() {
  window.location.href = "/admin/login"
  setOpen(false)
}


  useEffect(() => {
    const sections = menu.map((item) =>
      document.getElementById(item.id)
    )

    function onScroll() {
      const scrollPos = window.scrollY + 120

      for (let section of sections) {
        if (!section) continue
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(section.id)
        }
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => scrollTo("overview")}
          className="font-bold text-blue-900 text-lg cursor-pointer"
        >
          Raj Agencies
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative group text-sm font-medium"
            >
              <span
                className={`transition ${
                  active === item.id
                    ? "text-blue-700"
                    : "text-slate-700 group-hover:text-blue-700"
                }`}
              >
                {item.label}
              </span>

              {/* Underline */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-700 transition-all duration-300 ${
                  active === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="ml-4 px-5 py-2 rounded-lg border border-blue-900 text-blue-900 font-semibold
                       hover:bg-blue-900 hover:text-white transition"
          >
            Login
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl transition"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[520px] border-t" : "max-h-0"
        }`}
      >
        <div className="bg-white">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-6 py-4 border-b transition ${
                active === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Login */}
          <button
            onClick={handleLogin}
            className="block w-full text-left px-6 py-4 font-semibold text-blue-900 hover:bg-blue-50"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
