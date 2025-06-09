import ProfileHeader from "@/components/templates/DefaultPortfolio/components/ProfileHeader";

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case "profile-header":
      return <ProfileHeader data={widget.content} />;
  }
}
