import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/serverClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getBlogPosts() {
  const supabase = await createClient();

  try {
    const { data: posts, error } = await supabase
      .from("blog")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    return posts || [];
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getReadingTime(content) {
  if (!content) return "5 min read";

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} min read`;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/onefolio-main-icon.webp"
                alt="onefolio logo"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-slate-900">
                onefolio
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-900 border-b-2 border-blue-600"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              Create Portfolio →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 overflow-hidden">
          {/* Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] z-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #000 2px, transparent 0),
                                  radial-gradient(circle at 75% 75%, #000 1px, transparent 0),
                                  radial-gradient(circle at 85% 15%, #000 1px, transparent 0),
                                  radial-gradient(circle at 15% 85%, #000 2px, transparent 0)`,
              backgroundSize: "50px 50px, 30px 30px, 40px 40px, 35px 35px",
              backgroundPosition: "0 0, 20px 20px, 15px 5px, 30px 35px",
            }}
          ></div>

          {/* Animated Blob Backgrounds */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-40 blur-[40px]"
              style={{
                background: `radial-gradient(circle at 20% 80%, rgba(255, 154, 158, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 40% 40%, rgba(255, 183, 77, 0.3) 0%, transparent 50%)`,
                animation: "float 20s ease-in-out infinite",
              }}
            ></div>
          </div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center space-y-6">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                📝 Blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                Tips & <span className="text-blue-600">Inspiration</span>
                <br />
                for Your Portfolio
              </h1>
              <p className="max-w-[600px] mx-auto text-xl text-slate-600 leading-relaxed">
                Discover helpful articles, design tips and inspiration for
                creating stunning portfolios.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  No Blog Articles Yet
                </h3>
                <p className="text-slate-600 mb-8">
                  The first articles are being prepared. Check back soon!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium"
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Latest Articles
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    {posts.length} {posts.length === 1 ? "article" : "articles"}{" "}
                    found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border-0">
                        {post.cover_image && (
                          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {getReadingTime(post.content_md)}
                            </div>
                          </div>

                          <CardTitle
                            className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 overflow-hidden text-ellipsis"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <CardDescription
                            className="text-slate-600 text-base leading-relaxed overflow-hidden text-ellipsis"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.excerpt || "Read more..."}
                          </CardDescription>

                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                              Read Article
                            </span>
                            <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all duration-200" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/images/onefolio-main-icon.webp"
                alt="onefolio logo"
                width={32}
                height={32}
              />
              <span className="text-2xl font-semibold">onefolio.</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-rose-400"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm text-slate-500 hover:text-rose-400"
              >
                Blog
              </Link>
            </nav>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} onefolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
