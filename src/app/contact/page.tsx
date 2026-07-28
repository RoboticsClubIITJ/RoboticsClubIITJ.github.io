'use client';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { Mail, MapPin, Copy, Check, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      icon: <GithubIcon />,
      label: 'GitHub',
      handle: '@RoboticsClubIITJ',
      href: siteConfig.socials.github,
      color: 'hover:border-white/30 hover:text-white',
    },
    {
      icon: <LinkedinIcon />,
      label: 'LinkedIn',
      handle: 'Robotics Club IIT Jodhpur',
      href: siteConfig.socials.linkedin,
      color: 'hover:border-blue-500/40 hover:text-blue-400',
    },
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      handle: '@roboticsiitj',
      href: siteConfig.socials.instagram,
      color: 'hover:border-pink-500/40 hover:text-pink-400',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'Discord',
      handle: 'Join our server',
      href: siteConfig.socials.discord,
      color: 'hover:border-indigo-500/40 hover:text-indigo-400',
    },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">CONNECT</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Contact &amp; Socials</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
          <p className="text-white/50 text-lg max-w-2xl">
            Have questions about our project work or want to collaborate? Connect with us through
            the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">EMAIL ADDRESS</span>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <a href={`mailto:${siteConfig.email}`} className="text-lg font-bold text-white hover:text-cyan-400 transition-colors break-all">
                {siteConfig.email}
              </a>
              <button
                onClick={handleCopy}
                className="liquid-glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white flex items-center gap-2 transition-all flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">PHYSICAL COORDINATES</span>
            </div>
            <div>
              <p className="text-white font-bold">{siteConfig.location.name}</p>
              <p className="text-white/50 text-sm mt-1">{siteConfig.location.address}</p>
              <p className="text-white/50 text-sm">{siteConfig.location.city}</p>
            </div>
          </motion.div>
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
        >
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">CONNECTIVITY PORTS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-5 rounded-xl border border-white/8 bg-white/2 text-white/50 transition-all duration-300 ${s.color}`}
              >
                <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="font-bold text-sm">{s.label}</div>
                  <div className="text-xs text-white/35 mt-0.5">{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
