import { createClient } from "@/lib/supabase/serverClient";
import DefaultPortfolio from "@/components/templates/DefaultPortfolio/DefaultPortfolio";
import LightPortfolioPage from "@/components/templates/Light/Light";
// import FancyPortfolio from "@/components/templates/FancyPortfolio/FancyPortfolio";

export default async function PortfolioPage({ params, searchParams }) {
  const supabase = await createClient();

  const { username } = await params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

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
    // fancy: FancyPortfolio,
  };

  const Template = portfolioTemplates[portfolio.theme];
  return (
    <Template data={widgets} userId={profile.user_id} portfolio={portfolio} />
  );
}
