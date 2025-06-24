// components/TrackingLinksClientTable.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export default function TrackingLinksClientTable({ userId }) {
  const [links, setLinks] = useState([]);

  const supabase = createClient(); // clientseitiger Supabase Client

  const fetchLinks = async () => {
    const { data } = await supabase
      .from("tracking_links")
      .select("*")
      .eq("user_id", userId);
    setLinks(data || []);
  };

  useEffect(() => {
    fetchLinks();

    const channel = supabase
      .channel("tracking_links_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tracking_links",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime change:", payload);
          fetchLinks(); // refetch bei Insert/Update/Delete
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return <DataTable columns={columns} data={links} />;
}
