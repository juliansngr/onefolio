import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm({ className }) {
  return (
    <div className={className}>
      <section>
        <Card className="bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
