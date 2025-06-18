import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Rocket, Edit, Target, Share2 } from "lucide-react";
import { CreatePortfolioButton } from "@/app/editor/components/CreatePortfolioButton";

const gettingStartedSteps = [
  {
    title: "Create Your First Portfolio",
    description:
      "Use our drag-and-drop editor to build your portfolio in minutes",
    icon: <Edit className="w-5 h-5" />,
    action: "Create Portfolio",
    completed: true,
  },
  {
    title: "Add Your Content",
    description:
      "Showcase your projects, skills, and experience with our ready to use widgets",
    icon: <Target className="w-5 h-5" />,
    action: "Add Content",
    completed: false,
  },
  {
    title: "Publish & Share",
    description: "Make your portfolio live and share it with potential clients",
    icon: <Share2 className="w-5 h-5" />,
    action: "Publish & Share",
    completed: false,
  },
];

export default function GettingStarted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-blue-500" />
          Getting Started
        </CardTitle>
        <CardDescription>
          Follow these steps to create your professional portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {gettingStartedSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600`}
                >
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
              </div>
            </div>
          ))}
          <CreatePortfolioButton />
        </div>
      </CardContent>
    </Card>
  );
}
