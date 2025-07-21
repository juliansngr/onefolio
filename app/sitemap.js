import { createClient } from "@/lib/supabase/serverClient";

export default async function sitemap() {
  const supabase = await createClient();

  const { data: userNames } = await supabase.from("profiles").select("*");

  //   const { data: blogPosts } = await supabase.from("blogs").select("*");

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
    },
    ...userNames.map((user) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${user.username}`,
      lastModified: new Date(),
    })),
  ];
}
