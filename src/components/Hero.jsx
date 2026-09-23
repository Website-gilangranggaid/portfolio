import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

const titles = ['Junior Developer', 'Tech Enthusiast', 'UI/UX Explorer', 'Problem Solver'];

function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 60, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(
          isDeleting
            ? current.substring(0, display.length - 1)
            : current.substring(0, display.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return display;
}

export default function Hero() {
  const typed = useTypingEffect(titles);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Orbit ring decoration */}
      <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-[#2c67ed11] rounded-full animate-spin"
           style={{ animationDuration: '60s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_12px_#2c67ed]" />
      </div>
      <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-[#2c67ed08] rounded-full animate-spin"
           style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#7c3aed]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-accent font-medium tracking-widest uppercase text-sm mb-4"
        >
          Welcome to my universe
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] text-white glow-text leading-tight"
        >
          Gilang Rangga
        </motion.h1>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-xl md:text-2xl text-gray-300"
        >
          <span className="text-accent">&lt;</span>
          <span className="mx-1">{typed}</span>
          <span className="typing-cursor" />
          <span className="text-accent">/&gt;</span>
        </motion.div>

        {/* Short tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 text-gray-500 max-w-md mx-auto text-base"
        >
          Crafting digital experiences from the edge of the cosmos.
          Passionate about clean code, modern UI, and continuous learning.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a href="#portfolio"
             className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
             style={{
               background: 'linear-gradient(135deg, #2c67ed 0%, #1a4fd4 100%)',
               boxShadow: '0 0 25px #2c67ed44, 0 4px 15px #0006',
             }}>
            View My Work
          </a>
          <a href="#contact"
             className="px-8 py-3 rounded-full font-semibold text-white border border-[#2c67ed44] transition-all duration-300 hover:border-accent hover:bg-[#2c67ed11] hover:scale-105">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <HiChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
