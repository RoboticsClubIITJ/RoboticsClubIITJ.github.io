import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllBlogs, getBlog } from "@/lib/blogs";

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article>
        <header className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">
            {blog.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <time>{blog.date}</time>
            {blog.author && <span>· {blog.author}</span>}
            {blog.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-2 py-0.5 font-sans"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-pre:bg-[oklch(0.04_0.004_240)] prose-pre:border prose-pre:border-border">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-border pt-6">
          <Link href="/blogs" className="text-sm text-primary hover:underline">
            ← Back to all blogs
          </Link>
        </footer>
      </article>
    </main>
  );
}
