import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Star,
  CheckCircle,
  Crown,
  Zap,
  Globe,
  BarChart3,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import SubscribeButton from "@/components/SubscribeButton";
import { cn } from "@/lib/utils";

const premiumFeatures = [
  {
    icon: <Globe className="w-4 h-4" />,
    title: "Custom Domain",
    description: "Connect your own domain (yourname.com)",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Advanced Analytics",
    description: "Detailed insights & visitor tracking",
  },
  {
    icon: <Crown className="w-4 h-4" />,
    title: "White Label",
    description: 'Remove "Powered by onefol.io" branding',
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "Priority Support",
    description: "Get help when you need it most",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Premium Templates",
    description: "Access to exclusive designs",
  },
];

export default function GetPremium({
  disabled,
  title,
  value,
  description,
  color,
  type,
  className,
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl py-0 shadow-purple-200/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/30 group",
        className
      )}
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-pink-50/80 opacity-60" />

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300" />

      {/* Content */}
      <div className="relative bg-white/90 backdrop-blur-sm m-1 p-6 rounded-lg">
        <CardHeader className="pb-4 px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm">
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Upgrade to Pro
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Unlock premium features & grow faster
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 font-semibold">
              50% OFF
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-0">
          {/* Features List */}
          <div className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 transition-all duration-200 hover:bg-slate-100/80 group/feature"
              >
                <div className="flex-shrink-0 p-1.5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg group-hover/feature:from-purple-200 group-hover/feature:to-purple-300 transition-colors">
                  <div className="text-purple-600">{feature.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {feature.description}
                  </p>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-pink-50/80 rounded-xl p-4 border border-purple-200/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">$4.99</span>
                <span className="text-sm text-slate-600">/month</span>
                <span className="ml-2 text-xs text-slate-500 line-through">
                  $9.99
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-600">Save 50%</div>
                <div className="text-xs font-medium text-emerald-600">
                  Limited time offer!
                </div>
              </div>
            </div>

            <SubscribeButton />

            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Cancel anytime
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                14-day free trial
              </span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center py-2 border-t border-slate-200/60">
            <p className="text-xs text-slate-500">
              Join <span className="font-semibold text-slate-700">2,500+</span>{" "}
              professionals who upgraded to Pro
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
