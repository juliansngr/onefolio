import { createClient } from "@/lib/supabase/browserClient";

export const deleteTrackingLink = async (linkId) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("tracking_links")
    .delete()
    .eq("id", linkId);

  if (error) {
    console.error(error);
  }
};
