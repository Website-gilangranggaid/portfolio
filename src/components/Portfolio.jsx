import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiAcademicCap, HiChip } from 'react-icons/hi';
import {
  SiReact, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiGithub, SiNodedotjs, SiPython, SiFigma, SiVite,
} from 'react-icons/si';

const tabs = [
  { id: 'projects', label: 'Projects', icon: HiCode },
  { id: 'certificates', label: 'Certificates', icon: HiAcademicCap },
  { id: 'techstack', label: 'Tech Stack', icon: HiChip },
];

const projects = [
  {
    title: 'Simulasi 4D Tata Surya Antigravitasi',
    desc: 'Simulasi interaktif tata surya dan orbit planet secara 4D/3D photorealistic dengan sistem navigasi kosmik interaktif, efek gravitasi dinamis, dan pencahayaan luar angkasa imersif.',
    tags: ['Three.js', 'WebGL', 'Physics 4D', 'Interactive'],
    link: 'https://tatasurya-gilangranggaid.vercel.app/',
    color: '#2c67ed',
  },
  {
    title: 'gilangranggaid - Jasa Bot WA & Solusi Digital',
    desc: 'Platform penyedia layanan digital profesional untuk pembuatan Bot WhatsApp otomatis, perapian & konversi dokumen resmi, screening CV pelamar kerja, dan web development.',
    tags: ['WhatsApp Bot', 'Automation', 'Digital Service', 'React'],
    link: 'https://website-gilangranggaid.vercel.app/',
    color: '#10b981',
  },
  {
    title: 'Rumah Makan Koto Indah - Uda Ricky',
    desc: 'Website restoran masakan Padang autentik khas Minang yang menampilkan katalog menu makanan andalan (Rendang, Ayam Pop, Gulai Tunjang), informasi lokasi cabang, dan pemesanan online.',
    tags: ['Web Restoran', 'Katalog Menu', 'Landing Page', 'UI/UX'],
    link: 'https://rumahmakankotoindah-uda-ricky.vercel.app/',
    color: '#f59e0b',
  },
  {
    title: 'CV & Portfolio Interactive by gilangranggaid.co',
    desc: 'Showcase template CV modern dan portofolio profesional interaktif yang menyajikan ringkasan keterampilan teknis, profil karier, dan karya digital secara elegan dan responsif.',
    tags: ['Interactive CV', 'Digital Resume', 'Portfolio', 'Frontend'],
    link: 'https://website-cvportofolio-gilangrangga.vercel.app/',
    color: '#8b5cf6',
  },
  {
    title: 'Aplkasi digital Alquran',
    desc: 'Aplikasi Digital Alquran di desain dengan sepenuh hati,untuk menghapal Al-Qur'an.',
    tags: ['Mari Baca Alquran', 'Mari mengaji', 'pentingnya baca Alquran', 'Alquran'],
    link: 'https://ayobaca-alquran.vercel.app',
    color: '#ec4899',
  },
];

const certificates = [
  {
    title: 'Sertifikat Digital Literasi',
    issuer: 'Program Sertifikasi',
    year: '2024',
    color: '#2c67ed',
    photo: 'https://cdn.phototourl.com/member/2026-09-23-40f4ae1c-7ed6-430d-918f-b002102c3342.jpg',
  },
  {
    title: 'Sertifikat Integritas Kerja',
    issuer: 'Program Sertifikasi',
    year: '2024',
    color: '#10b981',
    photo: 'https://cdn.phototourl.com/member/2026-09-23-9bcc8bbf-f0f3-48bd-ab8d-940b623e1bf1.jpg',
  },
  {
    title: 'Sertifikat Bahasa Jepang N5',
    issuer: 'Sertifikat Bahasa Jepang N5',
    year: '2024',
    color: '#f59e0b',
    photo: 'https://cdn.phototourl.com/member/2026-09-23-a4193ca7-a822-4da2-8de2-1625460ba072.jpg',
  },
  {
    title: 'Sertifikat Teknik perancangan gambar mesin',
    issuer: 'Sertifikat Teknik perancangan gambar mesin',
    year: '2024',
    color: '#8b5cf6',
    photo: 'https://cdn.phototourl.com/member/2026-09-23-3da720f9-13b7-43f4-a48c-627ba2c92b97.jpg',
  },
  {
    title: 'React for Beginners',
    issuer: 'Online Course',
    year: '2025',
    color: '#ec4899',
    photo: 'https://cdn.phototourl.com/member/2026-09-23-40f4ae1c-7ed6-430d-918f-b002102c3342.jpg',
  },
];

const techStack = [
  { name: 'React', icon: SiReact, color: '#61DAFB', level: 70 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 75 },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', level: 90 },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', level: 85 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 80 },
  { name: 'Git', icon: SiGit, color: '#F05032', level: 65 },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff', level: 70 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 50 },
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 45 },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', level: 55 },
  { name: 'Vite', icon: SiVite, color: '#646CFF', level: 70 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">What I've built</p>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white glow-text">
          Portfolio
        </h2>
        <div className="mx-auto mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      </motion.div>

      {/* Tab bar */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeUp} custom={1}
        className="flex justify-center mb-12"
      >
        <div className="inline-flex gap-1 p-1.5 rounded-full glass glow-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="portfolio-tab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #2c67ed, #1a4fd4)',
                      boxShadow: '0 0 20px #2c67ed44',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-4 h-4" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((p, i) => {
              const hasLink = p.link && p.link !== '#';
              const cardInner = (
                <>
                  {/* Top Bar: Accent indicator + Live Demo Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-1.5 rounded-full" style={{ background: p.color }} />
                    {hasLink ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Demo
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-medium rounded-full text-accent/90 border border-[#2c67ed33] bg-[#2c67ed0e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-accent text-sm font-semibold">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {hasLink ? 'Kunjungi Website' : 'Lihat Detail'}
                    </span>
                    <HiExternalLink className="w-4 h-4 group-hover:scale-125 transition-transform" />
                  </div>
                </>
              );

              return hasLink ? (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="glass glow-border p-6 group hover:border-accent hover:shadow-[0_0_25px_#2c67ed33] transition-all duration-300 flex flex-col cursor-pointer text-left block"
                >
                  {cardInner}
                </motion.a>
              ) : (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="glass glow-border p-6 group hover:border-accent/40 transition-all duration-300 flex flex-col text-left"
                >
                  {cardInner}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'certificates' && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {certificates.map((c, i) => (
              <motion.div
                key={c.title} variants={fadeUp} custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass glow-border p-6 group hover:border-accent/40 transition-all duration-300 overflow-hidden"
              >
                <img
                  src={c.photo}
                  alt={c.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-white font-bold text-sm leading-tight">{c.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{c.issuer}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-full text-accent border border-[#2c67ed33]">
                  {c.year}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'techstack' && (
          <motion.div
            key="techstack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {techStack.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.name} variants={fadeUp} custom={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass glow-border p-5 text-center group hover:border-accent/40 transition-all duration-300"
                >
                  <Icon className="w-9 h-9 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: t.color }} />
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  {/* Skill bar */}
                  <div className="mt-3 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${t.color}88, ${t.color})` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{t.level}%</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
