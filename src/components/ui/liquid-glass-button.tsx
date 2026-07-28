'use client';
import React from 'react';
import { cn } from '@/lib/utils';
interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cyan' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
}
export function LiquidGlassButton({
  variant = 'default',
  size = 'md',
  className,
  children,
  href,
  onClick,
  ...props
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  const variantClasses = {
    default: 'liquid-glass text-white/90',
    cyan: 'liquid-glass liquid-glass-cyan text-cyan-300',
    outline: 'liquid-glass border-white/20 text-white/80',
  };
  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2',
    'rounded-full font-semibold tracking-wide uppercase',
    'cursor-pointer select-none',
    'transition-all duration-300',
    sizeClasses[size],
    variantClasses[variant],
    className
  );
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={baseClasses} {...props}>
      {children}
    </button>
  );
}
