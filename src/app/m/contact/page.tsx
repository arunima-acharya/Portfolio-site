"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function MobileContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:arunimaacharya17@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--sp-cream)",
    border: "1.5px solid var(--sp-charcoal)",
    borderRadius: "var(--radius-lg)",
    padding: "13px 14px",
    fontSize: 16,
    color: "var(--sp-charcoal)",
    fontFamily: "var(--font-geist), sans-serif",
    outline: "none",
  };

  return (
    <main style={{ padding: "28px 20px 48px" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--sp-orange)", fontFamily: "var(--font-geist), sans-serif" }}>
        get in touch
      </span>
      <h1 style={{ fontFamily: "var(--font-gelica)", fontSize: 28, fontWeight: 600, color: "var(--sp-cocoa)", margin: "6px 0 12px" }}>
        contact me
      </h1>
      <p style={{ fontSize: 15, color: "rgba(23,23,23,0.6)", lineHeight: 1.6, margin: "0 0 24px", fontFamily: "var(--font-geist), sans-serif" }}>
        Have a project in mind or just want to say hi? Fill out the form below or reach out directly.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        <a
          href="mailto:arunimaacharya17@gmail.com"
          style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", fontSize: 15, color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif", textDecoration: "none" }}
        >
          <Mail size={16} style={{ color: "var(--sp-orange)" }} />
          arunimaacharya17@gmail.com
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", fontSize: 15, color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}>
          <MapPin size={16} style={{ color: "var(--sp-orange)" }} />
          Available for remote work
        </div>
      </div>

      {sent ? (
        <div
          style={{
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: "var(--radius-xl)",
            background: "var(--sp-dew)",
            padding: "28px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: "var(--spacing-8)", color: "var(--sp-orange)" }}>✓</div>
          <p style={{ fontSize: 17, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: "var(--font-geist), sans-serif", margin: 0 }}>
            Message sent!
          </p>
          <p style={{ fontSize: 14, color: "#8a8580", fontFamily: "var(--font-geist), sans-serif", margin: "4px 0 0" }}>
            Your email client should have opened. I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}>name</label>
            <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}>email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--sp-charcoal)", fontFamily: "var(--font-geist), sans-serif" }}>message</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." style={{ ...inputStyle, resize: "none" }} />
          </div>
          <button
            type="submit"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)",
              borderRadius: "var(--radius-2xl-2)", padding: "14px 0", fontSize: 16, fontWeight: 500,
              color: "var(--sp-charcoal)", fontFamily: "var(--font-gelica)",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            Send Message <ArrowUpRight size={15} />
          </button>
        </form>
      )}
    </main>
  );
}
