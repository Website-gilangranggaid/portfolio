import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCode, HiStar, HiDocumentText } from 'react-icons/hi';

const DRIVE_CV_URL =
  'https://drive.google.com/file/d/1nyYuXR6HYgUZEvqkjHWg-t1T7DRFg1Ni/view?usp=drivesdk';

const USER_PHOTO =
  'https://cdn.phototourl.com/member/2026-09-23-1e9b3824-cc33-4077-bf91-9095f7751f3e.png';

const SPIDEY_PHOTO =
  'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80';

const stats = [
  { label: 'Projects', value: '10+', icon: HiCode },
  { label: 'Certificates', value: '5+', icon: HiStar },
  { label: 'Experience', value: '5+ Yr', icon: HiBriefcase },
  { label: 'Tech Stack', value: '8+', icon: HiAcademicCap },
];

const education = [
  {
    period: '2018 - 2021',
    title: 'SMK TEXMACO KARAWANG',
    desc: 'Jurusan Teknik Perancangan Gambar Mesin',
    detail:
      'Jurusan ini mampu mengevaluasi hasil dari solusi yang dikembangkan dan memiliki keterampilan analisis yang baik serta ketelitian tentang alat kerja, yang mana pernah belajar menggunakan jangka Sorong dan mikrometer sekrup serta pemrograman komputer untuk membuat bentuk alat kerja melalui AutoCAD.',
  },
];

const experience = [
  {
    period: 'Jan 2021 - Mar 2021',
    title: 'Asset Management & Maintenance',
    desc: 'PT Pindo Deli Pulp and Paper',
    detail:
      'Preventive Maintenance (Pemeliharaan Pencegahan): Melakukan pengecekan rutin harian seperti memeriksa level oli, tekanan oli, suhu komponen, hingga tekanan air pendingin (water cooler) pada mesin-mesin pabrik. Controlling Utility & Support System: Memastikan pasokan utilitas pendukung mesin produksi berjalan stabil, misalnya mengontrol stabilitas aliran udara bertekanan tinggi (kompresor) agar selalu berada di batas aman untuk kebutuhan workshop, mesin pewarnaan (color kitchen), dan instrumen pabrik lainnya. Plan Maintenance & Shutdown: Menyusun jadwal perawatan berkala ketika mesin mati (machine shutdown) serta mengoordinasikan estimasi durasi waktu perbaikan dengan departemen produksi agar tidak mengganggu target output kertas. Troubleshooting & Corrective Maintenance: Melakukan penanganan cepat dan perbaikan langsung jika terjadi kerusakan mendadak pada mesin produksi guna meminimalkan waktu henti pabrik (downtime).',
  },
  {
    period: '2022 - 2023',
    title: 'Helper Produksi',
    desc: 'PT Heinz ABC',
    detail:
      'Membantu memindahkan dan menyiapkan bahan baku serta kemasan agar line produksi tetap berjalan, mengoperasikan dan membantu menjaga kelancaran mesin pengemasan (filling) sesuai Standar Operasional Prosedur (SOP), serta menjaga kebersihan area kerja dan mesin sesuai standar GMP (Good Manufacturing Practices) dan pedoman higienis perusahaan makanan.',
  },
  {
    period: 'Jun 2024 - Mei 2026',
    title: 'Crew of Store',
    desc: 'PT Albany Corona Lestari (Indomaret Group)',
    detail:
      'Menata produk di rak toko sesuai standar, memastikan label harga terpasang dengan benar, dan melakukan rotasi barang (First Expired, First Out / FEFO) agar tidak ada barang kedaluwarsa. Membersihkan area lantai, rak, dan lingkungan sekitar kasir agar toko tetap nyaman dikunjungi. Membantu mengecek stok barang, menerima barang kiriman dari gudang, dan melakukan stock opname (pencatatan persediaan barang) secara berkala. Melakukan transaksi pembayaran tunai maupun nontunai serta melayani layanan pembayaran lainnya.',
  },
  {
    period: '2026 - Sekarang',
    title: 'Web Developer - IT Analyst',
    desc: 'Freelance / Remote',
    detail:
      'Mengembangkan website dan sistem informasi berbasis web modern menggunakan React, Tailwind CSS, dan teknologi terkini. Melakukan analisis kebutuhan bisnis untuk merancang solusi digital yang efisien, membuat antarmuka yang responsif dan user-friendly, serta mengelola proyek pengembangan dari tahap perencanaan hingga deployment. Bertanggung jawab atas analisis data, debugging sistem, dan memastikan kinerja optimal dari setiap aplikasi yang dikembangkan.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function About() {
  // Otomatis berubah secara halus dan berulang: Foto Saya <-> Spiderman
  const [isSpidey, setIsSpidey] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSpidey((prev) => !prev);
    }, 3800); // Berganti otomatis setiap 3.8 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
          Get to know me
        </p>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white glow-text">
          About Me
        </h2>
        <div className="mx-auto mt-4 w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      </motion.div>

       {/* 3-Column Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-20">
        {/* ================= LEFT COLUMN: Name & Quote ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="lg:col-span-4 lg:col-start-1 flex flex-col items-center justify-center order-2 lg:order-1"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
            My name is <span className="text-accent glow-text">Gilang Rangga Linggani</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed italic max-w-xs mx-auto lg:mx-0">
            "With great power comes great responsibility."
          </p>
        </motion.div>

        {/* ================= CENTER COLUMN: Foto Morphing Spiderman + View Document ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
custom={1}
            className="lg:col-span-4 lg:col-start-5 flex flex-col items-center justify-center order-1 lg:order-2"
        >
          {/* Photo Frame Container (Tanpa tulisan nama/spiderman di foto) */}
          <div className="relative">
            {/* Jaring Laba-laba Halus di Latar Belakang Foto */}
            <div className="absolute -inset-10 pointer-events-none opacity-20 spider-web-slow">
              <svg viewBox="0 0 200 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                <circle cx="100" cy="100" r="25" strokeWidth="0.8" opacity="0.4" />
                <circle cx="100" cy="100" r="50" strokeWidth="0.8" opacity="0.5" />
                <circle cx="100" cy="100" r="75" strokeWidth="0.8" opacity="0.6" />
                <circle cx="100" cy="100" r="95" strokeWidth="0.8" opacity="0.7" />
                <line x1="100" y1="5" x2="100" y2="195" strokeWidth="0.8" />
                <line x1="5" y1="100" x2="195" y2="100" strokeWidth="0.8" />
                <line x1="33" y1="33" x2="167" y2="167" strokeWidth="0.8" />
                <line x1="167" y1="33" x2="33" y2="167" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Glowing Aura Ring Halus yang Menyesuaikan Mode */}
            <motion.div
              className="absolute -inset-3 rounded-3xl blur-2xl pointer-events-none"
              animate={{
                background: isSpidey
                  ? 'radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(44,103,237,0.3) 60%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(44,103,237,0.65) 0%, rgba(59,130,246,0.25) 60%, transparent 80%)',
              }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Frame Foto Utama (Portrait Ratio 3:4 yang proporsional) */}
            <motion.div
              className="relative w-64 h-[350px] sm:w-72 sm:h-[390px] md:w-80 md:h-[430px] rounded-3xl overflow-hidden glass shadow-2xl"
              animate={{
                boxShadow: isSpidey
                  ? '0 0 35px rgba(239, 68, 68, 0.45), 0 0 70px rgba(44, 103, 237, 0.25), inset 0 0 25px rgba(239, 68, 68, 0.2)'
                  : '0 0 35px rgba(44, 103, 237, 0.55), 0 0 70px rgba(44, 103, 237, 0.2), inset 0 0 25px rgba(44, 103, 237, 0.2)',
                borderColor: isSpidey ? 'rgba(239, 68, 68, 0.55)' : 'rgba(44, 103, 237, 0.55)',
              }}
              style={{ border: '2px solid rgba(44, 103, 237, 0.5)' }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* LAYER 1: Foto Gilang Rangga */}
              <motion.img
                src={USER_PHOTO}
                alt="Gilang Rangga"
                className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
                initial={false}
                animate={{
                  opacity: isSpidey ? 0 : 1,
                  scale: isSpidey ? 1.04 : 1,
                  filter: isSpidey
                    ? 'brightness(0.85) contrast(1.1) blur(1px)'
                    : 'brightness(1) contrast(1) blur(0px)',
                }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* LAYER 2: Foto Spider-Man */}
              <motion.img
                src={SPIDEY_PHOTO}
                alt="Spider-Man"
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                initial={false}
                animate={{
                  opacity: isSpidey ? 1 : 0,
                  scale: isSpidey ? 1 : 0.96,
                  filter: isSpidey
                    ? 'brightness(1) contrast(1) blur(0px)'
                    : 'brightness(0.85) contrast(1.1) blur(1px)',
                }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Gelombang Energi Nanotech Halus saat Berganti Wujud */}
              <motion.div
                key={isSpidey ? 'to-spidey' : 'to-human'}
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                initial={{ y: isSpidey ? '100%' : '-100%', opacity: 0 }}
                animate={{
                  y: isSpidey ? '-100%' : '100%',
                  opacity: [0, 0.7, 0],
                }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                style={{
                  background: isSpidey
                    ? 'linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.5) 45%, rgba(255, 255, 255, 0.9) 50%, rgba(44, 103, 237, 0.5) 55%, transparent 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(44, 103, 237, 0.5) 45%, rgba(255, 255, 255, 0.9) 50%, rgba(59, 130, 246, 0.5) 55%, transparent 100%)',
                }}
              />

              {/* Vignette Sinematik Lembut di Tepi Foto */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: isSpidey
                    ? 'radial-gradient(circle at center, transparent 55%, rgba(239, 68, 68, 0.12) 80%, rgba(3, 0, 20, 0.7) 100%)'
                    : 'radial-gradient(circle at center, transparent 55%, rgba(44, 103, 237, 0.12) 80%, rgba(3, 0, 20, 0.7) 100%)',
                }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </div>

          {/* ================= TULISAN "VIEW DOCUMENT" DI BAWAH FOTO ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 w-full max-w-xs"
          >
            <a
              href={DRIVE_CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 group shadow-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #2c67ed 0%, #1a4fd4 100%)',
                boxShadow: '0 0 25px rgba(44, 103, 237, 0.5), 0 4px 15px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
               <HiDocumentText className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
               <span className="tracking-wide">View Document</span>
             </a>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: Bio & Tech Badges ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
custom={2}
            className="lg:col-span-4 lg:col-start-9 space-y-4 text-center lg:text-left order-3"
        >
          <h4 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] flex items-center justify-center lg:justify-start gap-2">
            <span>Tentang Saya</span>
            <span className="w-8 h-[2px] bg-accent inline-block" />
          </h4>

          <p className="text-gray-400 text-sm leading-relaxed">
            Seorang junior developer yang passionate di bidang web development.
            Saya senang mengeksplorasi teknologi baru dan membangun project yang kreatif.
            Saat ini fokus mendalami <strong className="text-white">React</strong>,{' '}
            <strong className="text-white">Tailwind CSS</strong>, dan ekosistem JavaScript modern.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            Dengan semangat <em>"With great power comes great responsibility"</em>,
            setiap baris kode saya rancang dengan perhatian penuh pada kerapian struktur,
            estetika visual, serta kenyamanan pengguna (UX).
          </p>

          <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
            {['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS', 'Git'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full text-accent border border-[#2c67ed33] bg-[#2c67ed0a]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* ================= STATISTIK ================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              className="glass glow-border p-6 text-center hover:border-accent/40 transition-all duration-300 group"
            >
              <Icon className="w-7 h-7 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ================= PENDIDIKAN & PENGALAMAN ================= */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Pendidikan */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#2c67ed11]">
              <HiAcademicCap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
              Pendidikan
            </h3>
          </div>
          <div className="space-y-4">
            {education.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass p-5 glow-border hover:border-accent/30 transition-all duration-300"
              >
                <span className="text-xs text-accent font-medium">{item.period}</span>
                <h4 className="text-white font-semibold mt-1">{item.title}</h4>
                <p className="text-accent text-xs font-medium mt-0.5">{item.desc}</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pengalaman */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#2c67ed11]">
              <HiBriefcase className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
              Pengalaman
            </h3>
          </div>
          <div className="space-y-4">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass p-5 glow-border hover:border-accent/30 transition-all duration-300"
              >
                <span className="text-xs text-accent font-medium">{item.period}</span>
                <h4 className="text-white font-semibold mt-1">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
