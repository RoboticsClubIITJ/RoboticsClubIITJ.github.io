'use client';
import { motion } from 'framer-motion';
import { teamMembers, facultyAdvisor } from '@/lib/data';
import { Mail, User } from 'lucide-react';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import Link from 'next/link';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
export default function TeamPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">TEAM DIRECTORY</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Core Team Members</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
          <p className="text-white/50 text-lg max-w-2xl">
            The student coordinators and technical heads directing the club&apos;s research, engineering, and outreach projects.
          </p>
        </motion.div>
        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-cyan-500/25 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white/30" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">
                    {member.name || <span className="text-white/25 italic">Name TBD</span>}
                  </h3>
                  <p className="text-cyan-400 text-sm tracking-wide uppercase mt-0.5">{member.role}</p>
                  <div className="flex items-center gap-3 mt-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors">
                        <LinkedinIcon />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/50 hover:text-white transition-colors">
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Faculty Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-white/30 uppercase">FACULTY ADVISOR</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-8">Faculty Advisor</h2>
          <div className="p-8 rounded-2xl border border-cyan-500/15 bg-cyan-500/5 backdrop-blur-sm max-w-md">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/20 flex items-center justify-center text-xl font-black text-white">
                BK
              </div>
              <div>
                <h3 className="text-white font-black text-xl">{facultyAdvisor.name}</h3>
                <p className="text-cyan-400 text-xs tracking-wider uppercase mt-1">{facultyAdvisor.department}</p>
                <p className="text-white/40 text-sm mt-1">{facultyAdvisor.institution}</p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Notice about incomplete data */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 mb-10"
        >
          <p className="text-yellow-400/80 text-sm">
            ⚠️ Team member data is being updated. Current coordinators&apos; information will be added soon.
          </p>
        </motion.div>
        <Link href="/contact">
          <LiquidGlassButton variant="cyan">Get in Touch</LiquidGlassButton>
        </Link>
      </div>
    </div>
  );
}
