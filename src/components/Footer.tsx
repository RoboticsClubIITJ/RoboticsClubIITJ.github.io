import Link from 'next/link';
import { Bot, ExternalLink, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/data';

// Inline SVG icons for social platforms not in lucide-react
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <img src="/logo.png" alt="Robotics IITJ Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
              </div>
              <div>
                <div className="text-xs font-black tracking-[0.2em] text-white uppercase">ROBOTICS</div>
                <div className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">IITJ</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <GithubIcon />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/60 hover:text-cyan-400 transition-colors">
                <LinkedinIcon />
              </a>
              <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/60 hover:text-pink-400 transition-colors">
                <InstagramIcon />
              </a>
              <a href={siteConfig.socials.discord} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/60 hover:text-indigo-400 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {([['Home', '/'], ['About & Structure', '/about'], ['Projects Showcase', '/projects'], ['Meet the Team', '/team'], ['Alumni Network', '/alumni'], ['Join the Society', '/contact']] as [string, string][]).map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 hover:text-cyan-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href={siteConfig.notionRepo} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Notion Knowledge Base <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Club GitHub Organization <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={siteConfig.iitjSite} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  IIT Jodhpur Site <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/contact"
                  className="text-sm text-white/50 hover:text-cyan-400 transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/8">
          <div className="pb-4 text-center sm:text-left text-[11px] font-mono tracking-wider text-white/40">
            Created by <span className="text-cyan-400 font-semibold">Taksh Mehta</span> & <span className="text-cyan-400 font-semibold">Piyush Singh Bhati</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-4">
            <p className="text-xs text-white/30">© 2026 {siteConfig.name}. All Rights Reserved.</p>
            <p className="text-xs text-white/20">Indian Institute of Technology Jodhpur</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
