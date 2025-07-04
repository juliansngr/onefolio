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
  Settings,
  Trash2,
  Plus,
} from "lucide-react";
import { addDomain, verifyDomain } from "./actions";
import { toast } from "sonner";

const dnsRecords = [
  {
    type: "A",
    name: "@",
    value: "216.198.79.1",
    ttl: "3600",
  },
  {
    type: "A",
    name: "@",
    value: "76.76.19.123",
    ttl: "3600",
  },
  {
    type: "TXT",
    name: "_onefol-verification",
    value: "onefol-verification=abc123def456ghi789",
    ttl: "3600",
  },
];

export default function DomainsPage({ domainData }) {
  const [domain, setDomain] = useState(domainData);
  const [newDomain, setNewDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return;

    setIsLoading(true);
    const response = await addDomain(newDomain);

    if (response.error) {
      toast.error(response.error.message);
      setIsLoading(false);
      return;
    }

    setDomain(response.insertedDomain);
    setNewDomain("");
    setIsLoading(false);
  };

  const handleReplaceDomain = async () => {
    if (!newDomain.trim()) return;

    setIsLoading(true);
    await addDomain(newDomain);

    setDomain(domainData[0]);
    setNewDomain("");
    setIsLoading(false);
  };

  const handleVerifyDomain = async () => {
    if (!domain) return;

    setIsLoading(true);
    const response = await verifyDomain();

    if (response.error) {
      toast.error(response.error.message);
      setIsLoading(false);
      return;
    }

    // setDomain({
    //   ...domain,
    //   status: Math.random() > 0.3 ? "active" : "failed",
    //   sslStatus: Math.random() > 0.3 ? "active" : "failed",
    //   verifiedDate: new Date().toISOString().split("T")[0],
    // });
    setIsLoading(false);
  };

  const handleDeleteDomain = () => {
    setDomain(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "connecting":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Connecting
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pro Upgrade Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <Star className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>Upgrade to Pro</strong> to connect your custom domain and
          remove onefol.io branding.{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-purple-600 underline"
          >
            Upgrade now
          </Button>
        </AlertDescription>
      </Alert>

      {/* Current Domain Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your Custom Domain</CardTitle>
          <CardDescription>
            {domain
              ? "Manage your connected domain"
              : "Connect a custom domain to your portfolio"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {domain ? (
            <div className="space-y-6">
              {/* Domain Info */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <Globe className="w-10 h-10 text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">{domain.domain}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Status:</span>
                        {getStatusBadge(domain.status)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Added {new Date(domain.added_at).toLocaleDateString()}
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
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <RefreshCw
                        className={`w-4 h-4 mr-2 ${
                          isLoading ? "animate-spin" : ""
                        }`}
                      />
                      {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" asChild>
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Replace Domain
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Replace Domain</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter a new domain to replace your current one. Your
                        current domain ({domain.domain}) will be disconnected.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <Label htmlFor="replaceDomain">New Domain</Label>
                      <Input
                        id="replaceDomain"
                        placeholder="newdomain.com"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setNewDomain("")}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleReplaceDomain}
                        disabled={!newDomain.trim()}
                      >
                        Replace Domain
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Domain
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Domain</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove {domain.domain}? Your
                        portfolio will go back to using the default onefol.io
                        subdomain. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteDomain}
                        className="bg-red-600 hover:bg-red-700"
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
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No custom domain connected
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your own domain to make your portfolio accessible at
                your custom URL
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="example.com or www.example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your domain without http:// or https://
                  </p>
                </div>

                <Button
                  onClick={handleAddDomain}
                  disabled={isLoading || !newDomain.trim()}
                  className="w-full"
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
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Before connecting your domain:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                      <li>
                        Make sure you own the domain and have access to DNS
                        settings
                      </li>
                      <li>
                        You'll need to add DNS records to verify ownership
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
        <Card>
          <CardHeader>
            <CardTitle>DNS Configuration</CardTitle>
            <CardDescription>
              {domain
                ? `Add these DNS records to verify ownership of ${domain.domain}`
                : "DNS records you'll need to add after connecting your domain"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> DNS changes can take up to 48 hours
                to propagate worldwide. Most changes are visible within 1-2
                hours.
              </AlertDescription>
            </Alert>

            <div>
              <h3 className="font-semibold mb-4">Required DNS Records</h3>
              <div className="space-y-4">
                {dnsRecords.map((record, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500">TYPE</Label>
                        <p className="font-mono text-sm">{record.type}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">NAME</Label>
                        <p className="font-mono text-sm">{record.name}</p>
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-gray-500">VALUE</Label>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm truncate">
                            {record.value}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(record.value)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">TTL</Label>
                        <p className="font-mono text-sm">{record.ttl}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-800 mb-3">
                Setting up DNS records can be tricky. We've created step-by-step
                guides for popular providers.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-200 text-blue-700 bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View DNS Setup Guides
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domain Examples */}
      {!domain && (
        <Card>
          <CardHeader>
            <CardTitle>Domain Format Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-medium text-green-800 mb-2">
                  ✓ Correct Format
                </p>
                <div className="space-y-1 text-sm text-green-700">
                  <p>example.com</p>
                  <p>www.example.com</p>
                  <p>portfolio.example.com</p>
                  <p>john.dev</p>
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-red-800 mb-2">
                  ✗ Incorrect Format
                </p>
                <div className="space-y-1 text-sm text-red-700">
                  <p>https://example.com</p>
                  <p>http://www.example.com</p>
                  <p>example.com/portfolio</p>
                  <p>example.com:3000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
