import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function GetPremium({
  disabled,
  title,
  value,
  description,
  color,
  type,
}) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-purple-900">
              Upgrade to Pro
            </CardTitle>
            <CardDescription className="text-purple-700">
              Unlock premium features
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Connect custom domain (yourname.com)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Advanced analytics & insights</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Remove "Powered by onefol.io" branding</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Priority support</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Premium templates</span>
          </div>
        </div>

        <div className="pt-2 border-t border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-purple-900">$4.99</span>
              <span className="text-sm text-purple-600">/month</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              50% OFF
            </Badge>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Upgrade Now
          </Button>
          <p className="text-xs text-purple-600 text-center mt-2">
            Cancel anytime • 14-day free trial
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
