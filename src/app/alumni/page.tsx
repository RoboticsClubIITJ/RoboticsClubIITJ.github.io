'use client';
import { motion } from 'framer-motion';
import { alumni } from '@/lib/data';
import { Users } from 'lucide-react';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import Link from 'next/link';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
export default function AlumniPage() {
  const byBatch = alumni.reduce((acc, a) => {
    if (!acc[a.batch]) acc[a.batch] = [];
    acc[a.batch].push(a);
    return acc;
  }, {} as Record<string, typeof alumni>);
  const batches = Object.keys(byBatch).sort((a, b) => b.localeCompare(a));
  const colors = ['text-cyan-400', 'text-violet-400', 'text-emerald-400', 'text-orange-400', 'text-rose-400'];
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">// LEGACY REGISTRY</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Our Alumni</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
          <p className="text-white/50 text-lg max-w-2xl">
            What we are today would not have been possible without the perseverance and dedication of
            our esteemed alumni, who continue to remain connected with us and inspire, mentor and
            motivate us.
          </p>
        </motion.div>
        {/* Alumni by batch */}
        {batches.map((batch, bi) => (
          <div key={batch} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-white">{batch}</h2>
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-white/30">{byBatch[batch].length} alumni</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byBatch[batch].map((alum, i) => (
                <motion.div
                  key={alum.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group p-5 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-white/15 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black mb-3 ${colors[bi % colors.length]}`}>
                        {alum.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <h3 className="text-white font-bold text-base">{alum.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{alum.batch}</p>
                      <p className="text-white/55 text-sm mt-3 leading-snug">{alum.position}</p>
                    </div>
                    {alum.linkedin && (
                      <a
                        href={alum.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors flex-shrink-0"
                      >
                        <LinkedinIcon />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        {/* Are you an alumnus? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 backdrop-blur-sm text-center"
        >
          <Users className="w-10 h-10 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-3">Are you an Alumnus?</h2>
          <p className="text-white/50 text-base max-w-xl mx-auto mb-6">
            We are always seeking to expand our network and we know there are many of you out there.
            If you&apos;ve been a part of the Robotics Club at IIT Jodhpur and would like to stay
            connected, mentor projects, or list your details, please reach out to us.
          </p>
          <Link href="/contact">
            <LiquidGlassButton variant="cyan" size="lg">
              CONNECT WITH US
            </LiquidGlassButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
