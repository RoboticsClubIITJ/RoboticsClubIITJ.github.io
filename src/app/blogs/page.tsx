import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

export const metadata = { title: "Blog | Robotics Club IITJ" };

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Articles, tutorials, and insights from the Robotics Club at IIT Jodhpur.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {blogs.map((b) => (
          <Link
            key={b.slug}
            href={`/blogs/${b.slug}`}
            className="group rounded-[var(--radius)] border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_8px_30px_oklch(0.72_0.07_215/10%)]"
          >
            <time className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {b.date}
            </time>
            <h2 className="mt-2 font-heading text-xl font-semibold group-hover:text-primary">
              {b.title}
            </h2>
            {b.excerpt && (
              <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
            )}
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
