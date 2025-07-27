import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import ShareButton from "./components/ShareButton";

async function getBlogPost(slug) {
  const supabase = await createClient();

  try {
    const { data: post, error } = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error in getBlogPost:", error);
    return null;
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

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  console.log("post", post);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements - Static with gentle animation */}
      <div className="fixed inset-0 z-0">
        {/* Static Gradient Orbs with gentle animation */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70"
          style={{ left: "10%", top: "20%" }}
        ></div>

        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-yellow-400/15 to-pink-600/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-60"
          style={{ right: "15%", top: "40%" }}
        ></div>

        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-green-400/15 to-blue-600/15 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000 opacity-50"
          style={{ left: "60%", bottom: "30%" }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 group">
            <Link href="/" className="flex items-center gap-2">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/onefolio-main-icon.webp"
                  alt="onefolio logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                onefolio
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block transition-all duration-300 hover:scale-105"
            >
              Sign in
            </Link>
            <Button
              asChild
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Link href="/auth/sign-up">
                Get Started
                <ArrowLeft className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <article className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/60 hover:shadow-md group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/60">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/60">
                <Clock className="h-4 w-4" />
                {getReadingTime(post.content_md)}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {post.cover_image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-8 shadow-lg border border-slate-200/60">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow duration-300">
            <div className="prose prose-slate prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-slate-900 mb-6 mt-8 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-slate-700 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/70 backdrop-blur-sm text-slate-700 italic mb-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100/70 backdrop-blur-sm text-slate-800 px-2 py-1 rounded text-sm font-mono border border-slate-200/60">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-900/95 backdrop-blur-sm text-slate-100 p-4 rounded-lg overflow-x-auto mb-4 border border-slate-700/60 shadow-lg">
                      {children}
                    </pre>
                  ),
                }}
              >
                {post.content_md}
              </ReactMarkdown>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-100/70 backdrop-blur-sm text-blue-700 border-blue-200/60 hover:scale-105 transition-transform duration-300">
                  📝 Blog Article
                </Badge>
                <span className="text-sm text-slate-500">
                  Published on {formatDate(post.created_at)}
                </span>
              </div>

              <ShareButton
                title={post.title}
                url={`${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://onefolio.de"
                }/blog/${post.slug}`}
              />
            </div>
          </footer>
        </article>

        {/* Call to Action */}
        <section className="bg-white/50 backdrop-blur-sm py-16 mt-16 border-t border-slate-200/60">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Ready for Your Own Portfolio?
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Use the tips from this article and create your stunning
                portfolio with onefolio today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg group"
                >
                  <Link href="/auth/sign-up">
                    Create Portfolio
                    <ArrowLeft className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rotate-180" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-200/60 bg-white/70 backdrop-blur-sm hover:bg-white text-slate-900 px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/blog">More Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-12 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/onefolio-main-icon.webp"
                  alt="onefolio logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                onefolio
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
              {["Features", "Pricing", "Blog", "Sign In"].map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === "Sign In"
                      ? "/auth/login"
                      : item === "Features"
                      ? "/#features"
                      : item === "Pricing"
                      ? "/#pricing"
                      : "/blog"
                  }
                  className="text-sm text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
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
