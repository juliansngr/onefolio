"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendContactRequest } from "./contactFormActions";
import { LoaderCircle, Send } from "lucide-react";

export default function ContactForm({ userId, portfolioId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact me</CardTitle>
        <CardDescription>Send me a message</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <p>Thank you for your message! I will get back to you soon.</p>
        ) : (
          <form
            action={async (formData) => {
              setIsLoading(true);
              const result = await sendContactRequest(formData);
              setIsLoading(false);
              if (result.success) {
                setIsSuccess(true);
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" required />
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required />

              <Input type="hidden" name="userId" value={userId} />
              <Input type="hidden" name="portfolioId" value={portfolioId} />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
