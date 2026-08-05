"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:ishaankausik@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSent(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#e8510a] text-sm font-semibold tracking-widest uppercase">Get in touch</span>
          <h1 className="text-4xl font-black text-[var(--text-primary)] mt-2 mb-3">Contact Me</h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Have a project in mind or just want to say hi? Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <Mail size={15} className="text-[#e8510a]" />
            <a href="mailto:ishaankausik@gmail.com" className="hover:text-[#e8510a] transition-colors">
              ishaankausik@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <MapPin size={15} className="text-[#e8510a]" />
            <span>Available for remote work</span>
          </div>
        </div>

        {/* Form */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-[#e8510a] rounded-lg p-8 text-center"
          >
            <div className="text-[#e8510a] text-4xl mb-3">✓</div>
            <p className="text-[var(--text-primary)] font-semibold text-lg">Message sent!</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Your email client should have opened. I'll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-md px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#e8510a] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-md px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#e8510a] transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-md px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#e8510a] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="self-start flex items-center gap-2 bg-[#e8510a] hover:brightness-110 transition text-white font-bold px-6 py-3 rounded-md text-sm tracking-wide"
            >
              Send Message <ArrowUpRight size={15} />
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}
