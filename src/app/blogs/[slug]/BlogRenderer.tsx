'use client';

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Blog } from "@/lib/blogs";

export default function BlogRenderer({ blog }: { blog: Blog }) {
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-x-hidden bg-black/30">
      {/* Ambient background - subdued for reading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/2 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-400 uppercase hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to blogs
          </Link>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              {blog.date}
            </span>
            {blog.author && (
              <span className="text-sm text-white/60 font-bold uppercase tracking-wider">
                BY {blog.author}
              </span>
            )}
            <div className="flex flex-wrap gap-2 ml-auto">
              {blog.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-white/5 text-white/50 border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-6 md:p-10 rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm shadow-xl"
        >
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-black prose-headings:text-white
            prose-p:text-white/60 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white/90
            prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:mx-auto prose-img:block
            prose-blockquote:border-l-cyan-500 prose-blockquote:bg-cyan-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-ul:text-white/60 prose-ol:text-white/60"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                a: ({ node, ...props }) => {
                  const href = props.href || "";
                  
                  // Check for YouTube links (watch, youtu.be, or playlist)
                  const isYouTube = href.includes("youtube.com/watch") || 
                                    href.includes("youtu.be/") || 
                                    href.includes("youtube.com/playlist");
                  
                  if (isYouTube && typeof props.children === 'string' && props.children.includes('http')) {
                    let embedUrl = "";
                    
                    if (href.includes("youtube.com/watch")) {
                      const url = new URL(href);
                      const videoId = url.searchParams.get("v");
                      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (href.includes("youtu.be/")) {
                      const videoId = href.split("youtu.be/")[1]?.split("?")[0];
                      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (href.includes("youtube.com/playlist")) {
                      const url = new URL(href);
                      const listId = url.searchParams.get("list");
                      if (listId) embedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}`;
                    }

                    if (embedUrl) {
                      return (
                        <span className="my-8 aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl block relative">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </span>
                      );
                    }
                  }
                  
                  // Standard links (open in new tab if external)
                  const isExternal = href.startsWith("http");
                  return (
                    <a 
                      {...props} 
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    />
                  );
                }
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
