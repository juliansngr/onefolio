import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export default function JobCard({ job }) {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let date = `${currentYear}-${currentMonth.toString().padStart(2, "0")}`;
  if (job.endDate === date.toString()) {
    job.endDate = "Present";
  } else {
    job.endDate = job.endDate.split("-").reverse().join("/");
  }

  if (job.startDate === date.toString()) {
    job.startDate = "Present";
  } else {
    job.startDate = job.startDate.split("-").reverse().join("/");
  }

  return (
    <Card className="border-0 shadow-sm p-4">
      <CardContent className="px-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            {job.position && (
              <h3 className="font-semibold text-gray-900">{job.position}</h3>
            )}
            {job.company && <p className="text-gray-600">{job.company}</p>}
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {job.startDate} - {job.endDate}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm max-w-md">{job.description}</p>
      </CardContent>
    </Card>
  );
}
