"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:arunimaacharya17@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--sp-cream)",
    border: "1.5px solid var(--sp-charcoal)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "16px",
    color: "var(--sp-charcoal)",
    fontFamily: "var(--font-geist), sans-serif",
    outline: "none",
    transition: "border-color 0.15s, background 0.15s",
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "var(--sp-cream)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="mb-10">
          <span
            className="text-[16px] font-semibold tracking-widest uppercase"
            style={{ color: "var(--sp-orange)", fontFamily: "var(--font-geist), sans-serif" }}
          >
            Get in touch
          </span>
          <h1
            className="mt-2 mb-3"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
              lineHeight: 1.1,
              fontWeight: 600,
              color: "var(--sp-cocoa)",
              fontFamily: "var(--font-fraunces), serif",
              textTransform: "capitalize",
            }}
          >
            Contact Me
          </h1>
          <p
            className="max-w-lg leading-relaxed"
            style={{ fontSize: "16px", color: "#8a8580", fontFamily: "var(--font-geist), sans-serif" }}
          >
            Have a project in mind or just want to say hi? Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div
            className="flex items-center gap-2"
            style={{ fontSize: "16px", color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}
          >
            <Mail size={15} style={{ color: "var(--sp-orange)" }} />
            <a
              href="mailto:arunimaacharya17@gmail.com"
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-charcoal)")}
            >
              arunimaacharya17@gmail.com
            </a>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ fontSize: "16px", color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}
          >
            <MapPin size={15} style={{ color: "var(--sp-orange)" }} />
            <span>Available for remote work</span>
          </div>
        </div>

        {/* Form */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
            style={{
              border: "1.5px solid var(--sp-charcoal)",
              borderRadius: "12px",
              background: "var(--sp-dew)",
              padding: "32px",
              boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
            }}
          >
            <div className="text-4xl mb-3" style={{ color: "var(--sp-orange)" }}>✓</div>
            <p
              className="font-semibold"
              style={{ fontSize: "18px", color: "var(--sp-cocoa)", fontFamily: "var(--font-geist), sans-serif" }}
            >
              Message sent!
            </p>
            <p
              className="mt-1"
              style={{ fontSize: "16px", color: "#8a8580", fontFamily: "var(--font-geist), sans-serif" }}
            >
              Your email client should have opened. I&apos;ll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-semibold uppercase tracking-wider"
                  style={{ fontSize: "13px", color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}
                >
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-orange)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--sp-charcoal)")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-semibold uppercase tracking-wider"
                  style={{ fontSize: "13px", color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-orange)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--sp-charcoal)")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="font-semibold uppercase tracking-wider"
                style={{ fontSize: "13px", color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}
              >
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-orange)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--sp-charcoal)")}
              />
            </div>
            <button
              type="submit"
              className="self-start flex items-center gap-2 transition-colors"
              style={{
                background: "var(--sp-cream)",
                border: "1.5px solid var(--sp-charcoal)",
                borderRadius: "20px",
                padding: "11px 28px",
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--sp-charcoal)",
                fontFamily: "var(--font-geist), sans-serif",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px 0px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-charcoal)")}
            >
              Send Message <ArrowUpRight size={15} />
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}
