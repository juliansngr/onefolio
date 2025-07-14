import ContactForm from "../ContactForm";
import HeroSection from "../HeroSection";
import Tags from "../Tags";
import FeaturedProjects from "../FeaturedProjects";
import Experience from "../Experience";
import Education from "../Education";
import Testimonials from "../Testimonials";
import Header from "../Header";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "header":
      return <Header data={widget.content} />;
    case "hero":
      return (
        <HeroSection
          data={widget.content}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "tags":
      return (
        <Tags
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "featured-projects":
      return (
        <FeaturedProjects
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "experience":
      return (
        <Experience
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "education":
      return (
        <Education
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "testimonials":
      return (
        <Testimonials
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
    case "contact-form":
      return (
        <ContactForm
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10"
        />
      );
  }
}
