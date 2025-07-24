import { Card, CardContent } from "@/components/ui/card";
import getReplyStatusBadge from "./getReplyStatusBadge";
import { createClient } from "@/lib/supabase/browserClient";
import { LoaderCircle, Mail } from "lucide-react";

export default function ContactsList({
  displayedMessages,
  selectedMessage,
  setSelectedMessage,
  isLoading,
}) {
  const supabase = createClient();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const markAsRead = async (id) => {
    await supabase
      .from("contact_form_requests")
      .update({ is_read: true })
      .eq("id", id);
  };

  if (isLoading) {
    return (
      <div className="lg:col-span-1 space-y-4">
        <div className="flex flex-col items-center justify-center py-16">
          <LoaderCircle className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-slate-500 mt-4">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (displayedMessages.length === 0) {
    return (
      <div className="lg:col-span-1 space-y-4">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No messages found
          </h3>
          <p className="text-slate-500 text-center">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 space-y-3">
      <div className="space-y-3 max-h-[600px] overflow-y-auto p-1 -m-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        {displayedMessages.map((contact) => (
          <Card
            key={contact.id}
            className={`group cursor-pointer transition-all duration-200 border-slate-200/60 hover:shadow-lg hover:shadow-slate-200/30 hover:border-slate-300/60 py-0 ${
              !contact.is_read
                ? "bg-gradient-to-r from-blue-50/80 to-white/80 border-blue-200/60 shadow-md shadow-blue-200/20"
                : "bg-white/70 backdrop-blur-sm"
            } ${
              selectedMessage?.id === contact.id
                ? "ring-2 ring-indigo-500/30 bg-indigo-50/80 border-indigo-300/60 shadow-lg shadow-indigo-200/30"
                : ""
            }`}
            onClick={() => {
              setSelectedMessage(contact);
              if (!contact.is_read) {
                markAsRead(contact.id);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4
                        className={`font-semibold truncate text-slate-900 ${
                          !contact.is_read ? "font-bold" : ""
                        }`}
                      >
                        {contact.sender}
                      </h4>
                      {!contact.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 truncate mb-3">
                      {contact.sender_email}
                    </p>
                    <div className="flex items-center justify-between">
                      {getReplyStatusBadge(contact.status)}
                      <p className="text-xs text-slate-500 flex-shrink-0 ml-2">
                        {formatDate(contact.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
