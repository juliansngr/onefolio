import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="py-16 text-center">
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black">
              Ready to Create Something Amazing? ✨
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Let's turn your ideas into reality! I'm always excited to work on
              new projects and collaborate with awesome people.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Let's Talk!
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-2xl bg-transparent"
            >
              <Download className="w-5 h-5 mr-2" />
              Get My Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
