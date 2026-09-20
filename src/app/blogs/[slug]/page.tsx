import { notFound } from "next/navigation";
import { getAllBlogs, getBlog } from "@/lib/blogs";
import BlogRenderer from "./BlogRenderer";

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

  return <BlogRenderer blog={blog} />;
}
