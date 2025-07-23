import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Rocket,
  Edit,
  Target,
  Share2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { CreatePortfolioButton } from "@/app/editor/components/CreatePortfolioButton";

const gettingStartedSteps = [
  {
    title: "Create Your First Portfolio",
    description:
      "Use our drag-and-drop editor to build your portfolio in minutes",
    icon: <Edit className="w-5 h-5" />,
    action: "Create Portfolio",
    completed: false,
    color: "indigo",
  },
  {
    title: "Add Your Content",
    description:
      "Showcase your projects, skills, and experience with our ready-to-use widgets",
    icon: <Target className="w-5 h-5" />,
    action: "Add Content",
    completed: false,
    color: "emerald",
  },
  {
    title: "Publish & Share",
    description: "Make your portfolio live and share it with potential clients",
    icon: <Share2 className="w-5 h-5" />,
    action: "Publish & Share",
    completed: false,
    color: "purple",
  },
];

export default function GettingStarted() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl shadow-sm">
            <Rocket className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-slate-900">Getting Started</span>
            <div className="inline-flex items-center ml-3 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
              3 Simple Steps
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-slate-600 leading-relaxed">
          Follow these steps to create your professional portfolio and start
          showcasing your work to the world.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Steps */}
        <div className="relative">
          {gettingStartedSteps.map((step, index) => {
            const colorClasses = {
              indigo: {
                bg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
                icon: "text-indigo-600",
                border: "border-indigo-200",
                completed: "bg-indigo-600 text-white",
              },
              emerald: {
                bg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
                icon: "text-emerald-600",
                border: "border-emerald-200",
                completed: "bg-emerald-600 text-white",
              },
              purple: {
                bg: "bg-gradient-to-br from-purple-100 to-purple-200",
                icon: "text-purple-600",
                border: "border-purple-200",
                completed: "bg-purple-600 text-white",
              },
            };

            const colors = colorClasses[step.color];

            return (
              <div key={index} className="group relative">
                {/* Connecting line - full height */}
                {index < gettingStartedSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-24 bg-slate-200 z-0" />
                )}

                <div className="flex items-start gap-4 relative z-10">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 relative">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        step.completed
                          ? colors.completed + " shadow-lg"
                          : colors.bg + " group-hover:scale-110"
                      } border ${colors.border} bg-white`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <div className={colors.icon}>{step.icon}</div>
                      )}
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60 transition-all duration-200 group-hover:bg-slate-100/80">
                      <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        {step.title}
                        {step.completed && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-emerald-50/80 rounded-xl p-6 border border-slate-200/60">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">
              Ready to start building?
            </h3>
            <p className="text-sm text-slate-600">
              Create your first portfolio now and join thousands of
              professionals showcasing their work.
            </p>
          </div>
          <div className="flex justify-center">
            <CreatePortfolioButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
