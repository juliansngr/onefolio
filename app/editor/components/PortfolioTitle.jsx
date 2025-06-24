"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, Save } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function PortfolioTitle({ title: initialTitle, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [hidePencil, setHidePencil] = useState(true);
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("portfolios")
      .update({ title })
      .eq("id", id);

    if (error) {
      console.error(error);
    }

    setIsEditing(false);
    setHidePencil(true);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
          <Input
            className="w-2/3 mr-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" className="cursor-pointer">
            <Save className="w-4 h-4" />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <span className="flex items-center">
      <h2
        className="text-lg font-medium truncate max-w-48 cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {title}
      </h2>
    </span>
  );
}
