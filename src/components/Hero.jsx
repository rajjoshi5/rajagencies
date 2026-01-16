const PRODUCTS = ["Fabrics", "Dress Materials", "Readymade", "Sarees"]
const REGIONS = ["Tamil Nadu", "Andhra Pradesh", "Telangana", "Karnataka", "Kerala"]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-b from-slate-100 via-white to-white"
    >
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute top-20 -right-40 w-[420px] h-[420px] bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
          <span>Since 1989</span>
          <span className="w-1 h-1 rounded-full bg-blue-500" />
          <span>Trusted Textile Network</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="block text-slate-900">
            Powering India’s Textile Trade
          </span>
          <span className="block mt-2 text-blue-700">
            Built on Trust.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          We connect dependable manufacturers with growth-driven retailers,
          creating reliable supply chains, faster execution, and long-term
          partnerships across South India.
        </p>

        {/* Categories */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Product Categories
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {PRODUCTS.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full text-sm bg-slate-100 border text-slate-700 cursor-pointer
                           transition-all duration-200
                           hover:-translate-y-0.5
                           hover:shadow-md
                           hover:bg-blue-50
                           hover:text-blue-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Operating Regions
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region) => (
              <span
                key={region}
                className="px-4 py-1.5 rounded-full text-sm bg-blue-50 border border-blue-100 text-blue-700 cursor-pointer
                           transition-all duration-200
                           hover:-translate-y-0.5
                           hover:shadow-md
                           hover:bg-blue-100"
              >
                {region}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-5 flex-wrap">
          <a
            href="tel:9994273343"
            className="px-8 py-4 rounded-xl bg-blue-900 text-white font-semibold
                       hover:bg-blue-800 transition shadow-lg hover:shadow-xl"
          >
            Talk to Us
          </a>

          <a
            href="mailto:chennairajmarketing@gmail.com"
            className="px-8 py-4 rounded-xl border border-slate-300 text-slate-800 font-semibold
                       hover:bg-slate-100 transition"
          >
            Send Email
          </a>
        </div>
      </div>
    </section>
  )
}
