import { useMemo } from 'react';

export default function StarsBackground() {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2.5 + 0.5;
      arr.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        '--dur': `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    return arr;
  }, []);

  return (
    <div className="stars-layer">
      {stars.map((s, i) => (
        <span key={i} style={s} />
      ))}

      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: '10%', left: '80%', animationDelay: '0s' }} />
      <div className="shooting-star" style={{ top: '30%', left: '60%', animationDelay: '3s' }} />
      <div className="shooting-star" style={{ top: '55%', left: '90%', animationDelay: '5s' }} />

      {/* Nebula blobs */}
      <div className="nebula" style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: '#2c67ed' }} />
      <div className="nebula" style={{ width: 500, height: 500, top: '40%', right: '-15%', background: '#7c3aed' }} />
      <div className="nebula" style={{ width: 400, height: 400, bottom: '-5%', left: '30%', background: '#2c67ed' }} />
    </div>
  );
}
