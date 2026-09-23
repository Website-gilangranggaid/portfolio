import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiUser, HiBriefcase, HiMail } from 'react-icons/hi';

const navItems = [
  { id: 'home', label: 'Home', icon: HiHome },
  { id: 'about', label: 'About', icon: HiUser },
  { id: 'portfolio', label: 'Portfolio', icon: HiBriefcase },
  { id: 'contact', label: 'Contact', icon: HiMail },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(n => document.getElementById(n.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'top-3' : 'top-5'
      }`}
    >
      <div className="relative flex items-center gap-1 px-2 py-2 rounded-full glass"
           style={{
             boxShadow: '0 0 20px #2c67ed33, 0 0 60px #2c67ed11, 0 0 100px #2c67ed08',
             border: '1px solid rgba(44,103,237,0.25)',
           }}>
        {/* Glow background */}
        <div className="absolute inset-0 rounded-full opacity-40"
             style={{
               background: 'radial-gradient(ellipse at center, #2c67ed22 0%, transparent 70%)',
             }} />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer z-10 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #2c67ed 0%, #1a4fd4 100%)',
                    boxShadow: '0 0 20px #2c67ed66, 0 0 40px #2c67ed22',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 w-4 h-4" />
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
