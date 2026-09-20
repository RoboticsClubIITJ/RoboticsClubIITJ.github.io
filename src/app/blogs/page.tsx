import { getAllBlogs } from "@/lib/blogs";
import BlogList from "./BlogList";

export const metadata = {
  title: "Blog | Robotics Club IITJ",
  description: "Articles, tutorials, and technical deep-dives from the Robotics Club at IIT Jodhpur.",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();
  return <BlogList blogs={blogs} />;
}
