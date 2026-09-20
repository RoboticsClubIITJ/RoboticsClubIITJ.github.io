'use client';

import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogMeta } from "@/lib/blogs";

export default function BlogList({ blogs }: { blogs: BlogMeta[] }) {
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">CLUB BLOG</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Latest Insights</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-6" />
          <p className="text-white/50 text-lg max-w-2xl">
            Articles, tutorials, and technical deep-dives from the Robotics Club at IIT Jodhpur.
          </p>
        </motion.div>

        {/* Blogs grid */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group relative flex flex-col h-full p-7 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <time className="mb-3 px-2.5 py-1 inline-block w-fit rounded-full text-[10px] font-bold tracking-wider uppercase border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                    {blog.date}
                  </time>
                  <h3 className="text-white font-bold text-2xl mb-3 leading-snug group-hover:text-cyan-400 transition-colors duration-200">
                    {blog.title}
                  </h3>
                  
                  {blog.excerpt && (
                    <p className="text-white/45 text-sm leading-relaxed mb-6 flex-grow">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {blog.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-white/5 text-white/50 border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-white/6 flex items-center justify-between">
                    {blog.author ? (
                      <span className="text-xs text-white/50 uppercase tracking-wider font-bold">
                        {blog.author}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                      Read more →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
