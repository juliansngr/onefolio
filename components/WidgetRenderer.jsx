import ProfileHeader from "@/components/templates/DefaultPortfolio/components/ProfileHeader";
import TextAndIcons from "@/components/templates/DefaultPortfolio/components/TextAndIcons";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "profile-header":
      return <ProfileHeader data={widget.content} />;
    case "text-and-icons":
      return (
        <TextAndIcons data={widget.content} indexValue={widget.position} />
      );
  }
}
