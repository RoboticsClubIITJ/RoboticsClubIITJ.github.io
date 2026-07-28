'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, domainColors } from '@/lib/data';
import { FileText, Video, Users, UserCheck, Filter } from 'lucide-react';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
type FilterType = 'All' | 'Ongoing' | 'Completed';
export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.status === filter);
  const filters: FilterType[] = ['All', 'Ongoing', 'Completed'];
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[180px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">// PROJECT ARCHIVE</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Club Projects</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
          <p className="text-white/50 text-lg">Browse our completed and ongoing projects.</p>
        </motion.div>
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-12">
          <Filter className="w-4 h-4 text-white/30" />
          <div className="flex items-center gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  filter === f
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'liquid-glass text-white/50 hover:text-white'
                }`}
              >
                {f}
                <span className="ml-2 text-[10px] opacity-60">
                  ({f === 'All' ? projects.length : projects.filter(p => p.status === f).length})
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="text-white/30 text-lg">No projects found for this filter.</p>
            </motion.div>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative p-7 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Status */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                      project.status === 'Ongoing'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      ● {project.status}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-3 leading-snug group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  {/* Summary */}
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{project.summary}</p>
                  {/* Domains */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.domains.map(d => (
                      <span key={d} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${domainColors[d] ?? 'bg-white/5 text-white/50 border-white/10'}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                  {/* Mentors & Contributors */}
                  <div className="flex flex-col gap-2 mb-6 pt-4 border-t border-white/6">
                    {project.mentors.length > 0 && (
                      <div className="flex items-start gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">Mentors </span>
                          <span className="text-xs text-white/50">{project.mentors.join(', ')}</span>
                        </div>
                      </div>
                    )}
                    {project.contributors.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="w-3.5 h-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">Contributors </span>
                          <span className="text-xs text-white/50">{project.contributors.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a href={project.docsLink} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                      <FileText className="w-3 h-3" /> Tech Docs
                    </a>
                    <a href={project.demoLink} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                      <Video className="w-3 h-3" /> Demo Video
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
