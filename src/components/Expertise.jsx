import useReveal from "../hooks/useReveal"

const expertise = [
  {
    title: "Manufacturer Sourcing",
    icon: "🧵",
    desc: "Direct sourcing from verified mills and fabric producers across Andhra Pradesh, Tamil Nadu, and Telangana.",
    points: [
      "Consistent quality benchmarking",
      "Price negotiation support",
      "Sampling coordination",
      "Capacity and lead-time validation",
    ],
  },
  {
    title: "Retail Network Access",
    icon: "🏬",
    desc: "Access to a curated network of premium retailers focused on repeat purchasing and long-term partnerships.",
    points: [
      "Retail onboarding and matching",
      "Order volume planning",
      "Seasonal demand alignment",
      "Margin optimization guidance",
    ],
  },
  {
    title: "Quality Assurance",
    icon: "✅",
    desc: "Operational controls to reduce rejections, shade variation, and dispatch mismatches.",
    points: [
      "Pre-dispatch inspections",
      "Shade and GSM consistency checks",
      "Sampling validation",
      "Issue resolution coordination",
    ],
  },
  {
    title: "Market Intelligence",
    icon: "📊",
    desc: "On-ground insights into pricing trends, fabric movement, and buyer behavior.",
    points: [
      "Live price benchmarking",
      "Demand forecasting signals",
      "Product trend visibility",
      "Competitive positioning support",
    ],
  },
  {
    title: "Order Coordination",
    icon: "🚚",
    desc: "Structured execution flow from order confirmation to dispatch and delivery tracking.",
    points: [
      "Timeline management",
      "Documentation alignment",
      "Dispatch follow-ups",
      "Exception handling",
    ],
  },
  {
    title: "Relationship Management",
    icon: "🤝",
    desc: "Long-term trust building across suppliers and buyers to ensure stability and repeat business.",
    points: [
      "Conflict resolution",
      "Payment cycle discipline",
      "Transparent communication",
      "Growth alignment planning",
    ],
  },
]

export default function Expertise() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="expertise"
      ref={ref}
      className={`py-28 bg-white transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Operational Expertise
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We operate deeply across execution, relationships, and market intelligence —
            not just deal facilitation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {expertise.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-slate-200 bg-white 
              transition transform hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-700 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
