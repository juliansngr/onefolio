import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ContactsSearch({ setSearchQuery, searchQuery }) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search messages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 bg-white"
      />
    </div>
  );
}
