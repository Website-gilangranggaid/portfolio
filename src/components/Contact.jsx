import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
  { icon: HiMail, label: 'Email', value: 'ranggalinggani@gmail.com' },
  { icon: HiPhone, label: 'Phone', value: '+6283895288348' },
  { icon: HiLocationMarker, label: 'Location', value: 'Indonesia' },
];

const socials = [
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6283895288348', color: '#25D366' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_#2c67ed22] transition-all duration-300';

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Let's connect</p>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white glow-text">
          Get In Touch
        </h2>
        <div className="mx-auto mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      </motion.div>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Left — info & socials */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="md:col-span-2 space-y-6"
        >
          <div className="glass glow-border p-6 space-y-5">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">Contact Info</h3>
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.label} variants={fadeUp} custom={i + 1}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex items-center gap-4 group">
                  <div className="p-2.5 rounded-xl bg-[#2c67ed11] group-hover:bg-[#2c67ed22] transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{c.label}</p>
                    <p className="text-white text-sm font-medium">{c.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Social links */}
          <div className="glass glow-border p-6">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)] mb-4">Follow Me</h3>
            <div className="grid grid-cols-1 gap-3 justify-items-center">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/30 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 transition-colors" style={{ color: s.color }} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{s.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={2}
          className="md:col-span-3"
        >
          <form onSubmit={handleSubmit} className="glass glow-border p-6 md:p-8 space-y-5">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">Send a Message</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text" name="name" placeholder="Your Name" required
                value={form.name} onChange={handleChange} className={inputClass}
              />
              <input
                type="email" name="email" placeholder="Your Email" required
                value={form.email} onChange={handleChange} className={inputClass}
              />
            </div>

            <input
              type="text" name="subject" placeholder="Subject"
              value={form.subject} onChange={handleChange} className={inputClass}
            />

            <textarea
              name="message" rows={5} placeholder="Your Message..." required
              value={form.message} onChange={handleChange}
              className={`${inputClass} resize-none`}
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #2c67ed, #1a4fd4)',
                boxShadow: '0 0 25px #2c67ed33, 0 4px 15px #0004',
              }}
            >
              {sent ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeUp} custom={4}
        className="mt-20 pt-8 border-t border-white/5 text-center"
      >
        <p className="text-gray-600 text-sm">
          Designed & Built by <span className="text-accent font-medium">Gilang Rangga</span>
        </p>
        <p className="text-gray-700 text-xs mt-1">
          &copy; {new Date().getFullYear()} &middot; All rights reserved
        </p>
      </motion.div>
    </section>
  );
}
