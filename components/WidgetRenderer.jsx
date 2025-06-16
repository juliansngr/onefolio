import ProfileHeader from "@/components/templates/DefaultPortfolio/components/ProfileHeader";
import TextAndIcons from "@/components/templates/DefaultPortfolio/components/TextAndIcons";
import JobExperience from "@/components/templates/DefaultPortfolio/components/JobExperience";
import Spacer from "@/components/templates/DefaultPortfolio/components/Spacer";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "about-me":
      return <ProfileHeader data={widget.content} />;
    case "text-and-icons":
      return (
        <TextAndIcons data={widget.content} indexValue={widget.position} />
      );
    case "job-experience":
      return (
        <JobExperience data={widget.content} indexValue={widget.position} />
      );
    case "spacer":
      return <Spacer data={widget.content} indexValue={widget.position} />;
  }
}
