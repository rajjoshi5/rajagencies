import useReveal from "../hooks/useReveal"

const values = [
  {
    title: "Integrity in Every Deal",
    desc: "Transparent pricing, honest communication, and consistent execution form the foundation of all our partnerships.",
    icon: "🛡️",
  },
  {
    title: "Long-Term Relationships",
    desc: "We prioritize sustainable partnerships over short-term volume, ensuring stability and mutual growth.",
    icon: "🔗",
  },
  {
    title: "Operational Discipline",
    desc: "Structured workflows, timely follow-ups, and execution accountability keep our supply chain reliable.",
    icon: "⚙️",
  },
  {
    title: "Market Awareness",
    desc: "Continuous tracking of trends, pricing signals, and demand patterns enables smarter decision making.",
    icon: "📈",
  },
  {
    title: "Quality First",
    desc: "Sampling validation, consistency checks, and issue resolution ensure product standards are maintained.",
    icon: "🎯",
  },
  {
    title: "Growth Mindset",
    desc: "We evolve with market dynamics while strengthening our network and operational capabilities.",
    icon: "🌱",
  },
]

export default function Values() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="values"
      ref={ref}
      className={`py-28 bg-slate-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Our Values
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            These principles guide how we operate, partner, and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-200 
              transition transform hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
