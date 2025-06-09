"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export async function saveEssentials(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: widget } = await supabase
    .from("widgets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (widget) {
    const { error } = await supabase
      .from("widgets")
      .update({ content: data })
      .eq("id", widget.id);

    if (error) {
      redirect("/error");
    }
  }

  if (!widget) {
    const { error } = await supabase.from("widgets").insert({
      user_id: user.id,
      type: "profile-header",
      content: data,
    });

    if (error) {
      redirect("/error");
    }
  }

  redirect("/editor");

  //   if (error) {
  //     redirect("/error");
  //   }
}
