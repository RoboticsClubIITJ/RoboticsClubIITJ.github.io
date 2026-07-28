'use client';
import { motion } from 'framer-motion';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const pillars = [
    {
      title: 'Software & Hardware',
      desc: 'We bridge the gap between software algorithms and physical hardware, building robots that operate in the real world.',
      color: 'steel',
    },
    {
      title: 'National & International Competitions',
      desc: 'We represent IIT Jodhpur in national and international robotics competitions, showcasing our engineering talent.',
      color: 'slate',
    },
    {
      title: 'Hands-on Learning',
      desc: 'We foster hands-on learning through technical sessions, workshops, and maintain an extensive open knowledge repository.',
      color: 'stone',
    },
    {
      title: 'Research & Innovation',
      desc: 'We push boundaries in autonomous systems, CV, control theory, and swarm robotics, with several ongoing research projects.',
      color: 'muted',
    },
    {
      title: 'Multidisciplinary Community',
      desc: 'Our members come from CS, electronics, and mechanical engineering backgrounds, enabling truly integrated system design.',
      color: 'slate',
    },
    {
      title: 'Real-World Solutions',
      desc: 'From drones to terrestrial vehicles and robotic manipulators, we design and deploy complete robotic systems.',
      color: 'steel',
    },
  ];

  // Matte color scheme — no bright saturation
  const colorClasses: Record<string, string> = {
    steel:  'border-slate-500/15 bg-slate-500/5 text-slate-300',
    slate:  'border-slate-600/15 bg-slate-600/5 text-slate-400',
    stone:  'border-stone-500/15 bg-stone-500/5 text-stone-300',
    muted:  'border-zinc-600/15 bg-zinc-600/5 text-zinc-400',
  };

  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      {/* Very subdued ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-slate-500/3 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-slate-600/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">ABOUT US</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-6">About the Club</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-slate-500/60 to-transparent mb-8" />
          <div className="max-w-3xl">
            <p className="text-white/55 text-lg leading-relaxed">
              The Robotics Club at the Indian Institute of Technology Jodhpur is a multidisciplinary
              student community of passionate tinkerers and explorers dedicated to bridging the gap
              between software and hardware to build real-world solutions.
            </p>
            <p className="text-white/55 text-lg leading-relaxed mt-4">
              By integrating computer science, electronics, and mechanical design, we build and deploy
              drones, terrestrial vehicles and manipulators, among others. We represent our institute
              in national and international robotics competitions, foster hands-on learning through
              sessions and workshops, and maintain an extensive repository to keep knowledge accessible
              to all.
            </p>
          </div>
        </motion.div>

        {/* What defines us */}
        <div className="mb-20">
          <span className="text-xs font-bold tracking-[0.25em] text-white/25 uppercase">WHAT DEFINES US</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-10">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`p-6 rounded-2xl border backdrop-blur-sm ${colorClasses[p.color]}`}
              >
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Faculty advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 rounded-2xl border border-white/7 bg-white/2 backdrop-blur-sm"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-white/25 uppercase">FACULTY ADVISOR</span>
          <div className="mt-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600/30 to-slate-700/30 border border-white/8 flex items-center justify-center text-2xl font-black text-white/80">
              BK
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Dr. Binod Kumar</h3>
              <p className="text-slate-400 text-sm tracking-wider uppercase mt-1">Department of Electronics Engineering</p>
              <p className="text-white/35 text-sm mt-1">Indian Institute of Technology Jodhpur</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/projects">
            <LiquidGlassButton variant="cyan" size="lg">
              Explore Projects <ArrowRight className="w-4 h-4" />
            </LiquidGlassButton>
          </Link>
          <Link href="/contact">
            <LiquidGlassButton variant="default" size="lg">
              Join the Club
            </LiquidGlassButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
