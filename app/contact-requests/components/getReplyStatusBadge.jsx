import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

export default function getReplyStatusBadge(status) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          <Clock className="w-3 h-3 mr-1" />
          Needs Reply
        </Badge>
      );
    case "replied":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Replied
        </Badge>
      );
    case "no-reply-needed":
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
          No Reply Needed
        </Badge>
      );
  }
}
