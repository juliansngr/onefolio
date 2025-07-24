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
      <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-sm hover:shadow-md transition-all duration-200">
        <Filter className="w-4 h-4 mr-2 text-slate-500" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
        <SelectItem value="all" className="hover:bg-slate-50 focus:bg-slate-50">
          All Messages
        </SelectItem>
        <SelectItem value="unread" className="hover:bg-amber-50 focus:bg-amber-50">
          Unread
        </SelectItem>
        <SelectItem value="read" className="hover:bg-slate-50 focus:bg-slate-50">
          Read
        </SelectItem>
        <SelectItem value="pending" className="hover:bg-orange-50 focus:bg-orange-50">
          Needs Reply
        </SelectItem>
        <SelectItem value="replied" className="hover:bg-emerald-50 focus:bg-emerald-50">
          Replied
        </SelectItem>
        <SelectItem value="archived" className="hover:bg-slate-50 focus:bg-slate-50">
          Archived
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
