'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShow(true);
    } else {
      onComplete();
    }
  }, [onComplete]);

  if (!mounted) return null;
  if (!show) return null;

  const handleComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShow(false);
    setTimeout(onComplete, 1000); // Wait for fade out animation
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      >
        <source src="/StartVideo.mp4" type="video/mp4" />
      </video>
      <button 
        onClick={handleComplete}
        className="absolute bottom-10 right-10 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase z-[101] transition-colors"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
