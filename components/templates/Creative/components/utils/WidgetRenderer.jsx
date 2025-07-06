import ProfileHeader from "@/components/templates/DefaultPortfolio/components/ProfileHeader";
import TextAndIcons from "@/components/templates/DefaultPortfolio/components/TextAndIcons";
import JobExperience from "@/components/templates/DefaultPortfolio/components/JobExperience";
import Spacer from "@/components/templates/DefaultPortfolio/components/Spacer";
import ContactForm from "../ContactForm";
import HeroSection from "../HeroSection";
import Skills from "../Skills";
import FeaturedProjects from "../FeaturedProjects";
import Experience from "../Experience";
import Education from "../Education";
import Testimonials from "../Testimonials";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "hero-section":
      return <HeroSection data={widget.content} />;
    case "skills":
      return <Skills data={widget.content} indexValue={widget.position} />;
    case "experience":
      return (
        <FeaturedProjects data={widget.content} indexValue={widget.position} />
      );
    case "education":
      return <Education data={widget.content} indexValue={widget.position} />;
    case "testimonials":
      return (
        <Testimonials data={widget.content} indexValue={widget.position} />
      );
    case "contact-form":
      return <ContactForm data={widget.content} indexValue={widget.position} />;
  }
}
