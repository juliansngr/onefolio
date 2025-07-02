import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Calendar,
  MoreVertical,
  CheckCircle,
  Clock,
  Archive,
  Trash2,
  Copy,
  Mail,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import getReplyStatusBadge from "./getReplyStatusBadge";
import CopyEmailButton from "./CopyEmailButton";
import { createClient } from "@/lib/supabase/browserClient";

export default function MessageDisplay({ selectedMessage }) {
  const supabase = createClient();

  const updateReplyStatus = async (id, status) => {
    await supabase
      .from("contact_form_requests")
      .update({ status: status })
      .eq("id", id);
  };

  const deleteMessage = async (id) => {
    await supabase.from("contact_form_requests").delete().eq("id", id);
  };

  const archiveMessage = async (id) => {
    await supabase
      .from("contact_form_requests")
      .update({ is_archived: true })
      .eq("id", id);
  };

  const unarchiveMessage = async (id) => {
    await supabase
      .from("contact_form_requests")
      .update({ is_archived: false })
      .eq("id", id);
  };

  return (
    <div className="lg:col-span-2">
      {selectedMessage ? (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div>
                  <CardTitle className="text-xl">
                    {selectedMessage.sender}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    {selectedMessage.sender_email}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "replied")
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Replied
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "pending")
                    }
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Mark as Needs Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "no-reply-needed")
                    }
                  >
                    <X className="w-4 h-4 mr-2" />
                    No Reply Needed
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {selectedMessage.is_archived ? (
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => unarchiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Unarchive
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-50 text-red-600"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Status:</span>
              {getReplyStatusBadge(selectedMessage.status)}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Message:</h4>
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <CopyEmailButton email={selectedMessage.sender_email} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a message
            </h3>
            <p className="text-gray-600">
              Choose a message from the list to view its contents
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
