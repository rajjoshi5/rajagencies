import { useEffect, useState } from "react"
import useReveal from "../hooks/useReveal"

const stats = [
  {
    value: 35,
    suffix: "+",
    label: "Years of Industry Experience",
    icon: "🏆",
  },
  {
    value: 75,
    suffix: "+",
    label: "Manufacturing Partners",
    icon: "🏭",
  },
  {
    value: 100,
    suffix: "+",
    label: "Retail Relationships",
    icon: "🤝",
  },
  {
    value: 3,
    suffix: "+",
    label: "States Covered",
    icon: "📍",
  },
]

export default function Stats() {
  const { ref, visible } = useReveal()
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!visible) return

    const duration = 1200
    const start = performance.now()

    function animate(time) {
      const progress = Math.min((time - start) / duration, 1)

      const updated = stats.map((stat) =>
        Math.floor(stat.value * progress)
      )

      setCounts(updated)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [visible])

  return (
    <section
      id="stats"
      ref={ref}
      className={`py-24 bg-slate-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Proven at Scale
          </h2>
          <p className="mt-3 text-slate-600">
            Our numbers reflect consistency, reliability, and deep market presence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center border border-slate-200 
              transition transform hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="text-3xl mb-4">{stat.icon}</div>

              <div className="text-4xl md:text-5xl font-bold text-blue-900">
                {counts[index]}
                <span className="text-blue-700">{stat.suffix}</span>
              </div>

              <p className="mt-3 text-sm md:text-base text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
