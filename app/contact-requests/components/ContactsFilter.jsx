import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function ContactsFilter({ setFilterStatus, filterStatus }) {
  return (
    <Select
      value={filterStatus}
      onValueChange={(value) => setFilterStatus(value)}
    >
      <SelectTrigger className="w-42 bg-white cursor-pointer">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="cursor-pointer">
          All Messages
        </SelectItem>
        <SelectItem value="unread" className="cursor-pointer">
          Unread
        </SelectItem>
        <SelectItem value="read" className="cursor-pointer">
          Read
        </SelectItem>
        <SelectItem value="pending" className="cursor-pointer">
          Needs Reply
        </SelectItem>
        <SelectItem value="replied" className="cursor-pointer">
          Replied
        </SelectItem>
        <SelectItem value="archived" className="cursor-pointer">
          Archived
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
