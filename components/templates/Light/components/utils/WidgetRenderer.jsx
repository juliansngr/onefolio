import ContactForm from "../ContactForm";
import HeroSection from "../HeroSection";
import Tags from "../Trags";
import FeaturedProjects from "../FeaturedProjects";
import Experience from "../Experience";
import Education from "../Education";
import Header from "../Header";
import Reviews from "../Reviews";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "header":
      return <Header data={widget.content} />;
    case "hero":
      return (
        <HeroSection
          data={widget.content}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "tags":
      return (
        <Tags
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "featured-projects":
      return (
        <FeaturedProjects
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "experience":
      return (
        <Experience
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "education":
      return (
        <Education
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "reviews":
      return (
        <Reviews
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
    case "contact-form":
      return (
        <ContactForm
          data={widget.content}
          indexValue={widget.position}
          className="max-w-6xl mx-auto px-6 py-6 space-y-12"
        />
      );
  }
}
