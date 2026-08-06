'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-2xl bg-black/60 border-b border-white/8'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <img src="/logo.png" alt="Robotics IITJ Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-black tracking-[0.2em] text-white uppercase">ROBOTICS</div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">IITJ</div>
            </div>
          </Link>
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-semibold tracking-wider text-white/60 hover:text-cyan-400 uppercase transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg',
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden liquid-glass p-2 rounded-lg text-white/70"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden backdrop-blur-2xl bg-black/80 border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-white/60 hover:text-cyan-400 uppercase tracking-wider transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg transition-all',
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
