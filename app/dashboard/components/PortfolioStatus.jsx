import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, ExternalLink, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function PortfolioStatus({
  progress,
  totalWidgets,
  lastUpdated,
  portfolioId,
  username,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Portfolio Status
        </CardTitle>
        <CardDescription>
          High performing portfolios contain at least 7 widgets. Therefore, your
          portfolio is {progress}% complete
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Completion Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Widgets:</span>
              <span className="ml-2 font-medium">{totalWidgets}</span>
            </div>
            <div>
              <span className="text-gray-600">Last Updated:</span>
              <span className="ml-2 font-medium">{lastUpdated}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="cursor-pointer" asChild>
              <Link href={`/editor/${portfolioId}`}>
                <Edit className="w-4 h-4 mr-2" />
                Continue Editing
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              asChild
            >
              <Link
                href={`https://onefol.io/u/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
