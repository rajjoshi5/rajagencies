import useReveal from "../hooks/useReveal"

export default function Contact() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-24 bg-gradient-to-b from-slate-50 to-white transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Let’s Start a Conversation
        </h2>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Whether you're a manufacturer looking to expand distribution or a retailer seeking
          reliable sourcing, our team is ready to connect and support your growth.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

          {/* Call */}
          <a
            href="tel:9994273343"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl 
              bg-blue-900 text-white font-semibold shadow-lg
              hover:bg-blue-800 hover:shadow-xl transition-all duration-300"
          >
            📞 Call Us
          </a>

          {/* Email */}
          <a
            href="mailto:chennairajmarketing@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl 
              border border-slate-300 text-slate-800 font-semibold
              hover:bg-slate-100 transition-all duration-300"
          >
            ✉️ Email Us
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919994273343"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl 
              bg-green-500 text-white font-semibold shadow-lg
              hover:bg-green-600 hover:shadow-xl transition-all duration-300"
          >
            💬 WhatsApp
          </a>

        </div>

        {/* Trust Line */}
        <div className="mt-10 text-sm text-slate-500">
          Chennai • Serving Tamil Nadu, Andhra Pradesh, Telangana, Karnataka & Kerala
        </div>

      </div>
    </section>
  )
}
