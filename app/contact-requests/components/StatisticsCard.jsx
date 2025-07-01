import { Card, CardTitle, CardFooter, CardContent } from "@/components/ui/card";

import {
  Mail,
  MailOpen,
  Search,
  Filter,
  MoreVertical,
  Copy,
  Archive,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  DivideCircle,
} from "lucide-react";

export default function StatisticsCard({ title, value, type, color }) {
  return (
    <Card className={`@container/card gap-0.5`}>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </p>
          {type === "total" ? (
            <div className={`p-3 bg-blue-50 rounded-full `}>
              <Mail className={`w-6 h-6 text-blue-500`} />
            </div>
          ) : type === "unread" ? (
            <div className={`p-3 bg-yellow-50 rounded-full `}>
              <MailOpen className={`w-6 h-6 text-yellow-500`} />
            </div>
          ) : type === "needs_reply" ? (
            <div className={`p-3 bg-amber-50 rounded-full `}>
              <Clock className={`w-6 h-6 text-amber-500`} />
            </div>
          ) : type === "replied" ? (
            <div className={`p-3 bg-green-50 rounded-full `}>
              <CheckCircle className={`w-6 h-6 text-green-500`} />
            </div>
          ) : (
            ""
          )}
        </div>
        <p className="text-muted-foreground text-sm">{title}</p>
      </CardContent>
    </Card>
  );
}
