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
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20">
          <CardHeader className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-xl text-slate-900 mb-1">
                    {selectedMessage.sender}
                  </CardTitle>
                  <p className="text-slate-600 mb-3 break-all">
                    {selectedMessage.sender_email}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-500">
                      {new Date(selectedMessage.created_at).toLocaleString(
                        "de-DE"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-100/60 text-slate-600"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/95 backdrop-blur-sm border-slate-200/60 shadow-xl"
                >
                  <DropdownMenuItem
                    className="hover:bg-emerald-50 focus:bg-emerald-50 text-emerald-700"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "replied")
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Replied
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-orange-50 focus:bg-orange-50 text-orange-700"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "pending")
                    }
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Mark as Needs Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-slate-50 focus:bg-slate-50 text-slate-700"
                    onClick={() =>
                      updateReplyStatus(selectedMessage.id, "no-reply-needed")
                    }
                  >
                    <X className="w-4 h-4 mr-2" />
                    No Reply Needed
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200/60" />
                  {selectedMessage.is_archived ? (
                    <DropdownMenuItem
                      className="hover:bg-slate-50 focus:bg-slate-50 text-slate-700"
                      onClick={() => unarchiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Unarchive
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="hover:bg-slate-50 focus:bg-slate-50 text-slate-700"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="hover:bg-red-50 focus:bg-red-50 text-red-600"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                Status:
              </span>
              {getReplyStatusBadge(selectedMessage.status)}
            </div>

            <div className="bg-gradient-to-br from-slate-50/80 to-white/80 p-6 rounded-xl border border-slate-200/60">
              <h4 className="font-semibold mb-3 text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                Message:
              </h4>
              <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {selectedMessage.message}
              </p>
            </div>

            <CopyEmailButton email={selectedMessage.sender_email} />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Select a message
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Choose a message from the list to view its contents and manage
              your responses
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
