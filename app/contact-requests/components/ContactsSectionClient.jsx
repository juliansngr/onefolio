"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useState, useEffect } from "react";
import ContactsSection from "./ContactsSection";
import ContactsStatistics from "./ContactsStatistics";
import { LoaderCircle, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="space-y-8">
      <ContactsStatistics messages={messages} />

      {isLoading || messages.length > 0 ? (
        <ContactsSection messages={messages} isLoading={isLoading} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mb-8">
            <MessageSquare className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            No messages yet
          </h2>
          <p className="text-slate-600 text-center mb-8 max-w-md leading-relaxed">
            You haven't received any contact requests yet. Add the contact form widget to your portfolio to start receiving messages from visitors.
          </p>
          <Button asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Link href="/editor" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Contact Form
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
