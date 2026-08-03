'use client';
import { useRef } from 'react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Card } from '@/components/ui/card';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import { projects, whatWeDo, siteConfig, domainColors } from '@/lib/data';
import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';



export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end end"]
  });

  // Add a spring physics layer to smooth out the mouse wheel steps
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.2
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      videoRef.current.currentTime = videoRef.current.duration * latest;
    }
  });

  return (
    <>
      {/* ─── FIXED BACKGROUND VIDEO ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <video 
          ref={videoRef}
          src="/StartVideo.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradients to darken top and bottom so text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      <div className="relative min-h-screen overflow-x-hidden z-10">

      {/* ─── HERO SECTION — Full-bleed Spline background ─── */}
      <section className="relative min-h-screen overflow-hidden bg-black z-10">

        {/* Full-bleed Spline 3D scene as background */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "15%" }}
          transition={{ delay: 3.5, duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-y-0 -inset-x-[20%] w-[140%] z-0"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* Gradient overlays for text readability */}
        {/* Strong left darkening — text lives on the left */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        {/* Top navbar fade */}
        <div className="absolute top-0 inset-x-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-black/70 to-transparent" />
        {/* Bottom fade into next section - fades to transparent so the fixed video reveals underneath */}
        <div className="absolute bottom-0 inset-x-0 h-52 z-10 pointer-events-none bg-gradient-to-t from-transparent via-black/80 to-transparent" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none grid-bg opacity-20" />

        {/* Spotlight effect spanning the whole hero */}
        <Card className="absolute inset-0 z-10 bg-transparent border-0 rounded-none pointer-events-none overflow-hidden">
          <Spotlight size={700} springOptions={{ bounce: 0 }} />
        </Card>

        {/* Text content floating over the background */}
        <div className="relative z-20 min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-24 pb-24 pointer-events-none">
          <div className="max-w-2xl">


            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8"
            >
              <span className="text-white">BUILDING</span>
              <br />
              <span className="text-white">THE FUTURE</span>
              <br />
              <span className="gradient-text text-glow-cyan">OF AUTONOMY</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md"
            >
              A community of student engineers, developers, and researchers at IIT Jodhpur
              building high-performance robots across domains and use-cases.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 pointer-events-auto"
            >
              <LiquidGlassButton variant="cyan" size="lg" href="/projects">
                EXPLORE PROJECTS
                <ArrowRight className="w-4 h-4" />
              </LiquidGlassButton>
              <LiquidGlassButton variant="default" size="lg" href="/team">
                MEET THE TEAM
              </LiquidGlassButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex gap-10 mt-14 pt-8 border-t border-white/10"
            >
              {[
                { val: '6+', label: 'Active Projects' },
                { val: '9+', label: 'Alumni' },
                { val: '5', label: 'Research Domains' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-cyan-400">{stat.val}</div>
                  <div className="text-xs text-white/40 tracking-wider uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 animate-float pointer-events-none"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ─── SCROLL CONTENT WRAPPER ─── */}
      <div ref={contentRef} className="relative">
        
        {/* Seamless blend from the black hero section into the transparent video background */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />

      {/* ─── WHAT WE DO ─── */}
      <section className="relative py-28 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">CAPABILITIES</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">What We Do</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatWeDo.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-500/25"
                >
                  <h3 className="text-white font-bold text-lg mb-2">{pillar.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="relative py-28 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">FEATURED WORK</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-3">Flagship Projects</h2>
            </div>
            <Link href="/projects">
              <LiquidGlassButton variant="default" size="sm">
                View All <ArrowRight className="w-3 h-3" />
              </LiquidGlassButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-3">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.domains.map((d) => (
                    <span key={d} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${domainColors[d] ?? 'bg-white/5 text-white/50 border-white/10'}`}>
                      {d}
                    </span>
                  ))}
                </div>
                <Link href="/projects" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400/70 hover:text-cyan-400 transition-colors">
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTION KNOWLEDGE BASE BANNER ─── */}
      <section className="relative py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-black/40 to-violet-500/5 backdrop-blur-xl overflow-hidden text-center"
          >
            {/* Decorative glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Want To Learn Robotics?
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-2xl mx-auto mb-8">
                For the curious and the passionate, there is no end to learning. We here at the
                Robotics Society believe in learning and exploring as much as we can, and
                disseminating it further. Access the repository to find all the cumulative
                knowledge our society has accumulated over the years.
              </p>
              <a href={siteConfig.notionRepo} target="_blank" rel="noopener noreferrer">
                <LiquidGlassButton variant="cyan" size="lg">
                  ACCESS NOTION REPO
                  <ExternalLink className="w-4 h-4" />
                </LiquidGlassButton>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      </div>
    </div>
    </>
  );
}
