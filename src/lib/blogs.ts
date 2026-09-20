import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
};

export type Blog = BlogMeta & { content: string };

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : (data.date ?? ""),
        author: data.author,
        tags: data.tags,
        excerpt: data.excerpt,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getBlog(slug: string): Blog | null {
  const file = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : (data.date ?? ""),
    author: data.author,
    tags: data.tags,
    excerpt: data.excerpt,
    content,
  };
}
