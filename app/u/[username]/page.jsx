import { createClient } from "@/lib/supabase/serverClient";
import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import LightPortfolioPage from "@/components/templates/Light/Light";
import CreativePortfolioPage from "@/components/templates/Creative/Creative";
import { cache } from "react";

const getProfile = cache(async (username) => {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return profile;
});

export async function generateMetadata({ params }) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return {
      title: `${username} is still available`,
      description: "This username is still available",
    };
  }

  return {
    title: {
      absolute: `${profile.username} | Portfolio`,
    },
    description: "View my portfolio and get in touch with me",
  };
}

export default async function PortfolioPage({ params, searchParams }) {
  const { username } = await params;
  const supabase = await createClient();

  const profile = await getProfile(username);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const { tr: linkId } = await searchParams;

  if (linkId) {
    // 1. Link aus tracking_links holen
    const { data: trackingLink, error: trackingLinkError } = await supabase
      .from("tracking_links")
      .select("*")
      .eq("link_id", linkId)
      .single();

    if (trackingLinkError) {
      console.error("Error:", trackingLinkError);
    } else if (trackingLink) {
      // 2. Zugehöriges Profil prüfen
      const { data: profileData, error: profileDataError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", trackingLink.user_id)
        .single();

      if (profileDataError || !profileData) {
        console.error("Profile nicht gefunden oder Fehler:", profileDataError);
        return;
      }

      if (trackingLink.user_id == profile.user_id) {
        const { error: updateError } = await supabase
          .from("tracking_links")
          .update({
            was_clicked: true,
            was_clicked_at: new Date().toISOString(),
          })
          .eq("link_id", linkId);

        if (updateError) {
          console.error(
            "Fehler beim Aktualisieren des Tracking Links:",
            updateError
          );
        }
      }
    }
  }

  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", profile.user_id)
    .eq("is_main", true)
    .single();

  const { data: widgets } = await supabase
    .from("widgets")
    .select("*")
    .eq("portfolio_id", portfolio.id);

  const portfolioTemplates = {
    alpha: DefaultPortfolio,
    light: LightPortfolioPage,
    creative: CreativePortfolioPage,
  };

  const Template = portfolioTemplates[portfolio.theme];
  return (
    <>
      <head>
        <title>{`${profile.username} | Portfolio`}</title>
        <meta
          name="description"
          content="View my portfolio and get in touch with me"
        />
      </head>
      <Template data={widgets} userId={profile.user_id} portfolio={portfolio} />
    </>
  );
}
