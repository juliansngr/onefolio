"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useState, useEffect } from "react";
import ContactsSection from "./ContactsSection";
import ContactsStatistics from "./ContactsStatistics";
import { LoaderCircle } from "lucide-react";

export default function ContactsSectionClient({ user }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_form_requests")
      .select("*")
      .eq("user_id", user.id);
    if (!error) {
      setMessages(data || []);
    } else {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("contact_form_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_form_requests",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.id]);

  return (
    <div className="flex flex-col gap-4">
      <ContactsStatistics messages={messages} />

      {isLoading || messages.length > 0 ? (
        <ContactsSection messages={messages} isLoading={isLoading} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">
            No messages found. Please add the contact form to your portfolio and
            start receiving messages today!
          </p>
        </div>
      )}
    </div>
  );
}
