import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LightningIntro from './components/LightningIntro';
import StarsBackground from './components/StarsBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  const handleIntroFinish = useCallback(() => {
    setIntroDone(true);
  }, []);

  useEffect(() => {
    if (introDone && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  }, [introDone]);

  return (
    <div className="relative min-h-screen bg-space-900">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/heat-waves.mp3"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Lightning Storm Intro */}
      {!introDone && <LightningIntro onFinish={handleIntroFinish} />}

      {/* Main site — fades in after intro */}
      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <StarsBackground />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Portfolio />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
