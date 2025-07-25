"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  Copy,
  ExternalLink,
  Shield,
  Star,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { addDomain, verifyDomain, deleteDomain } from "./actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const vercelNameservers = [
  {
    nameserver: "ns1.vercel-dns.com",
    description: "Primary nameserver",
  },
  {
    nameserver: "ns2.vercel-dns.com",
    description: "Secondary nameserver",
  },
];

export default function DomainsPage({ domainData, className, isPro }) {
  const [domain, setDomain] = useState(domainData);
  const [newDomain, setNewDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDomain = async () => {
    if (!isPro) {
      toast.error("Upgrade to Pro required for Custom Domain");
      return;
    }

    if (!newDomain.trim()) return;

    setIsLoading(true);
    const response = await addDomain(newDomain);

    if (response.error) {
      // Check if it's a Pro-required error
      if (response.error.status === 403) {
        toast.error("Pro subscription required for Custom Domains");
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    setDomain(response.insertedDomain);
    setNewDomain("");
    setIsLoading(false);
  };

  const handleVerifyDomain = async () => {
    if (!isPro) {
      toast.error("Upgrade to Pro required for Domain verification");
      return;
    }
    if (!domain) return;

    setIsLoading(true);
    const response = await verifyDomain();

    if (response.error) {
      // Check if it's a Pro-required error
      if (response.error.status === 403) {
        toast.error("Pro subscription required for Domain verification");
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    console.log(response);

    // setDomain({
    //   ...domain,
    //   status: Math.random() > 0.3 ? "active" : "failed",
    //   sslStatus: Math.random() > 0.3 ? "active" : "failed",
    //   verifiedDate: new Date().toISOString().split("T")[0],
    // });
    setIsLoading(false);
  };

  const handleDeleteDomain = async () => {
    if (!isPro) {
      toast.error("Upgrade to Pro required to delete Domain");
      return;
    }
    if (!domain) return;

    setIsLoading(true);
    const response = await deleteDomain();

    if (response.error) {
      // Check if it's a Pro-required error
      if (response.error.status === 403) {
        toast.error("Pro subscription required to delete Domain");
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    setDomain(null);
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "connecting":
        return (
          <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
            <RefreshCw className="w-3 h-3 mr-1" />
            Connecting
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Pro Upgrade Alert */}
      {!isPro && (
        <Alert className="border-purple-200/60 bg-purple-50/80 backdrop-blur-sm">
          <Star className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>Upgrade to Pro</strong> to connect your custom domain and
            remove onefol.io branding.{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-purple-600 underline hover:text-purple-700"
            >
              Upgrade now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Current Domain Status */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-slate-900">Your Custom Domain</span>
          </CardTitle>
          <CardDescription className="text-slate-600">
            {domain
              ? "Manage your connected domain and DNS configuration"
              : "Connect a custom domain to your portfolio"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {domain ? (
            <div className="space-y-6">
              {/* Domain Info */}
              <div className="p-6 border border-slate-200/60 rounded-xl bg-slate-50/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {domain.domain}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">
                            Status:
                          </span>
                          {getStatusBadge(domain.status)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Added{" "}
                        {new Date(domain.added_at).toLocaleDateString("de-DE")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {domain.status === "connecting" ||
                    domain.status === "failed" ? (
                      <Button
                        size="sm"
                        onClick={handleVerifyDomain}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <RefreshCw
                          className={`w-4 h-4 mr-2 ${
                            isLoading ? "animate-spin" : ""
                          }`}
                        />
                        {isLoading ? "Verifying..." : "Verify"}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/80 border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        asChild
                      >
                        <a
                          href={`https://${domain.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white/80 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Domain
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/95 backdrop-blur-md border-slate-200/60">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-900">
                        Remove Domain
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-600">
                        Are you sure you want to remove {domain.domain}? Your
                        portfolio will go back to using the default onefol.io
                        subdomain. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/80 border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteDomain}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                      >
                        Remove Domain
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ) : (
            /* No Domain Connected */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                No custom domain connected
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Connect your own domain to make your portfolio accessible at
                your custom URL and enhance your professional presence
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label
                    htmlFor="domain"
                    className="text-slate-700 font-medium"
                  >
                    Domain Name
                  </Label>
                  <Input
                    id="domain"
                    placeholder="example.com or www.example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="mt-2 bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Enter your domain without http:// or https://
                  </p>
                </div>

                <Button
                  onClick={handleAddDomain}
                  disabled={isLoading || !newDomain.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Adding Domain...
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" />
                      Connect Domain
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-8">
                <Alert className="border-blue-200/60 bg-blue-50/80 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Before connecting your domain:</strong>
                    <ul className="list-disc list-inside mt-3 space-y-1 text-left">
                      <li>
                        Make sure you own the domain and have access to your
                        registrar
                      </li>
                      <li>
                        You'll need to change your domain's nameservers to
                        Vercel
                      </li>
                      <li>
                        SSL certificate will be automatically generated after
                        verification
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DNS Setup Instructions */}
      {domain && (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-slate-900">DNS Configuration</span>
            </CardTitle>
            <CardDescription className="text-slate-600">
              {domain
                ? `Point ${domain.domain} to Vercel's nameservers to complete the setup`
                : "Configure your domain's nameservers to point to Vercel"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-amber-200/60 bg-amber-50/80 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> Nameserver changes can take up to 48
                hours to propagate worldwide. Most changes are visible within
                2-6 hours.
              </AlertDescription>
            </Alert>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">
                Vercel Nameservers
              </h3>
              <div className="space-y-4">
                <div className="p-6 border border-slate-200/60 rounded-xl bg-slate-50/80 backdrop-blur-sm">
                  <p className="text-sm text-slate-600 mb-4">
                    Change your domain's nameservers at your domain registrar to
                    the following Vercel nameservers:
                  </p>
                  <div className="space-y-3">
                    {vercelNameservers.map((ns, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-slate-200/40 rounded-lg bg-white/60"
                      >
                        <div className="flex-1">
                          <p className="font-mono text-sm font-semibold text-slate-900">
                            {ns.nameserver}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {ns.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition-all duration-200"
                          onClick={() => copyToClipboard(ns.nameserver)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/50 rounded-xl border border-blue-200/60 backdrop-blur-sm">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Steps to update nameservers:
                  </h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>
                      Log in to your domain registrar (GoDaddy, Namecheap, etc.)
                    </li>
                    <li>Find the "Nameservers" or "DNS Management" section</li>
                    <li>
                      Replace the existing nameservers with the Vercel
                      nameservers above
                    </li>
                    <li>
                      Save the changes and wait for propagation (2-48 hours)
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-200/60" />

            <div className="p-6 bg-gradient-to-br from-blue-50/80 to-blue-100/50 rounded-xl border border-blue-200/60 backdrop-blur-sm">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Need Help?
              </h4>
              <p className="text-sm text-blue-800 mb-4">
                Changing nameservers varies by registrar. We've created
                step-by-step guides for popular domain providers.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  className="bg-white/60 border-blue-200/60 text-blue-600/60 cursor-not-allowed"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Nameserver Guides
                </Button>
                <Badge className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-1">
                  Coming Soon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domain Examples */}
      {!domain && (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 py-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-slate-900">Domain Format Examples</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 rounded-xl border border-emerald-200/60 backdrop-blur-sm">
                <p className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Correct Format
                </p>
                <div className="space-y-2 text-sm text-emerald-700">
                  <p className="font-mono">example.com</p>
                  <p className="font-mono">www.example.com</p>
                  <p className="font-mono">portfolio.example.com</p>
                  <p className="font-mono">john.dev</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-50/80 to-red-100/50 rounded-xl border border-red-200/60 backdrop-blur-sm">
                <p className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Incorrect Format
                </p>
                <div className="space-y-2 text-sm text-red-700">
                  <p className="font-mono">https://example.com</p>
                  <p className="font-mono">http://www.example.com</p>
                  <p className="font-mono">example.com/portfolio</p>
                  <p className="font-mono">example.com:3000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
