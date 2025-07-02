import { Card, CardContent } from "@/components/ui/card";
import getReplyStatusBadge from "./getReplyStatusBadge";
import { createClient } from "@/lib/supabase/browserClient";
import { LoaderCircle } from "lucide-react";

export default function ContactsList({
  displayedMessages,
  selectedMessage,
  setSelectedMessage,
  isLoading,
}) {
  const supabase = createClient();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const markAsRead = async (id) => {
    await supabase
      .from("contact_form_requests")
      .update({ is_read: true })
      .eq("id", id);
  };

  return (
    <div className="lg:col-span-1 space-y-2">
      <div className="space-y-2 max-h-[600px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <LoaderCircle className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          displayedMessages.map((contact) => (
            <Card
              key={contact.id}
              className={`cursor-pointer transition-colors box-border p-1 ${
                !contact.is_read ? "bg-blue-50 border-blue-200" : ""
              } ${
                selectedMessage?.id === contact.id
                  ? " border-2 border-blue-200 bg-white"
                  : ""
              } `}
              onClick={() => {
                setSelectedMessage(contact);
                if (!contact.is_read) {
                  markAsRead(contact.id);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className={`font-medium truncate ${
                            !contact.is_read ? "font-bold" : ""
                          }`}
                        >
                          {contact.sender}
                        </p>
                        {!contact.is_read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {contact.sender_email}
                      </p>
                      <div className="flex items-center justify-between">
                        {getReplyStatusBadge(contact.status)}
                        <p className="text-xs text-gray-500">
                          {formatDate(contact.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
