import { createClient } from "@/lib/supabase/serverClient";

export const revalidate = 86400; // 24 hours

export default async function sitemap() {
  const supabase = await createClient();

  const { data: userNames } = await supabase.from("profiles").select("*");

  const { data: blogPosts } = await supabase.from("blog").select("slug");

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
    },
    ...userNames.map((user) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${user.username}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map((blog) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(),
    })),
  ];
}
