"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/browserClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Visibility animation cycle
    const visibilityInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(visibilityInterval);
    };
  }, []);

  useEffect(() => {
    async function getBlogPosts() {
      const supabase = createClient();

      try {
        const { data: posts, error } = await supabase
          .from("blog")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching blog posts:", error);
          setPosts([]);
        } else {
          setPosts(posts || []);
        }
      } catch (error) {
        console.error("Error in getBlogPosts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    getBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Mouse-following Gradient Orbs */}
        <div
          className={`absolute w-96 h-96 bg-gradient-to-r from-purple-400/30 to-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-30"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x - 10))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y - 10))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.8 + mousePosition.x / 500
            })`,
          }}
        ></div>

        <div
          className={`absolute w-80 h-80 bg-gradient-to-r from-rose-400/25 to-orange-600/25 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1500 ease-out ${
            isVisible ? "opacity-70" : "opacity-20"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, 100 - mousePosition.x + 10))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y + 20))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.9 + mousePosition.y / 400
            }) rotate(${mousePosition.x / 5}deg)`,
          }}
        ></div>

        <div
          className={`absolute w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-2000 ease-out ${
            isVisible ? "opacity-80" : "opacity-40"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x + 30))}%`,
            top: `${Math.max(0, Math.min(85, 100 - mousePosition.y + 15))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.7 + mousePosition.x / 600
            }) rotate(${-mousePosition.y / 3}deg)`,
          }}
        ></div>

        {/* Additional floating orb */}
        <div
          className={`absolute w-64 h-64 bg-gradient-to-r from-amber-400/15 to-rose-600/15 rounded-full mix-blend-multiply filter blur-xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-60" : "opacity-10"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x / 2 + 25))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y / 2 + 35))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.5 + mousePosition.y / 800
            })`,
          }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-purple-400/20 rounded-full transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100" : "opacity-20"
              }`}
              style={{
                left: `${(i * 17 + mousePosition.x / 10) % 100}%`,
                top: `${(i * 23 + mousePosition.y / 15) % 100}%`,
                transform: `scale(${
                  0.5 + (mousePosition.x + mousePosition.y) / 400
                })`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
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
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 relative"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block transition-all duration-300 hover:scale-105"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              Create Portfolio
              <ArrowRight className="ml-2 h-4 w-4 inline transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                Portfolio Tips & Inspiration
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
                  Tips &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800 animate-gradient-x">
                    Inspiration
                  </span>
                  <br />
                  for Your Portfolio
                </h1>
              </div>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed animate-fade-in-up animation-delay-400">
                Discover helpful articles, design tips and inspiration for
                creating stunning portfolios that showcase your best work.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-600">Loading articles...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 max-w-lg mx-auto">
                  <CardContent className="p-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      No Articles Yet
                    </h3>
                    <p className="text-slate-600 mb-8">
                      The first articles are being prepared. Check back soon for
                      amazing portfolio tips and inspiration!
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      Back to Home
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="text-center mb-16">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                    Latest Articles
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Portfolio Insights
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {posts.length} {posts.length === 1 ? "article" : "articles"}{" "}
                    to help you create amazing portfolios
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group pt-0">
                        {post.cover_image && (
                          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-300" />
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-purple-600">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.created_at)}
                            </div>
                            <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-purple-600">
                              <Clock className="h-4 w-4" />
                              {getReadingTime(post.content_md)}
                            </div>
                          </div>

                          <CardTitle
                            className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300 overflow-hidden text-ellipsis"
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
                            className="text-slate-600 text-base leading-relaxed overflow-hidden text-ellipsis mb-6"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.excerpt ||
                              "Read more to discover amazing portfolio tips..."}
                          </CardDescription>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-purple-200 transition-colors duration-300">
                            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                              Read Article
                            </span>
                            <ArrowRight className="h-4 w-4 text-purple-600 group-hover:text-purple-700 group-hover:translate-x-1 transition-all duration-300" />
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
              <span className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-purple-600">
                onefolio
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
              {["Home", "Blog", "Features", "Pricing"].map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Blog"
                      ? "/blog"
                      : `/#${item.toLowerCase()}`
                  }
                  className="text-sm text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} onefolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
