import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

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
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
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
        <article className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              <div className="flex items-center gap-1">
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
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-8">
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
          <div className="bg-white rounded-xl p-8 shadow-sm border">
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
                    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 text-slate-700 italic mb-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
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
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  📝 Blog Article
                </Badge>
                <span className="text-sm text-slate-500">
                  Published on {formatDate(post.created_at)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Share className="h-4 w-4" />
                Share this article
              </div>
            </div>
          </footer>
        </article>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 py-16 mt-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Ready for Your Own Portfolio?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Use the tips from this article and create your stunning portfolio
              with onefolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Create Portfolio →
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-8 py-3 rounded-md font-medium transition-colors"
              >
                More Articles
              </Link>
            </div>
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
