import useReveal from "../hooks/useReveal"

export default function Overview() {
  const { ref, visible } = useReveal()

  const highlights = [
    {
      title: "35+ Years of Continuity",
      desc: "Operating consistently since 1989 with long-standing manufacturer and retailer relationships.",
      icon: "🏆",
    },
    {
      title: "Multi-State Network",
      desc: "Strong sourcing presence across Andhra Pradesh, Tamil Nadu, and Telangana.",
      icon: "🌍",
    },
    {
      title: "Execution Driven",
      desc: "Focused on reliability, follow-through, and disciplined operations — not just deal making.",
      icon: "⚙️",
    },
  ]

  return (
    <section
      id="overview"
      ref={ref}
      className={`py-28 bg-slate-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
            Built on Relationships.
            <span className="block text-slate-800 mt-2">
              Proven by Execution.
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Since 1989, Raj Agencies has quietly powered the textile trade across South India.
            We work behind the scenes — connecting dependable manufacturers with growth-driven
            retailers, ensuring consistency, trust, and long-term value on both sides of the
            supply chain.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Our strength lies not in volume alone, but in relationships, discipline, and deep
            market understanding built over decades.
          </p>
        </div>

        {/* Right Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">

          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-200 transition transform hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="text-2xl">{item.icon}</div>

              <div>
                <h4 className="font-semibold text-slate-800">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}
