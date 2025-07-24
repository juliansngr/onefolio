"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, Save, X } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function PortfolioTitle({ title: initialTitle, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("portfolios")
      .update({ title })
      .eq("id", id);

    if (error) {
      console.error(error);
    }

    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 flex-1"
        >
          <Input
            className="flex-1 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            disabled={isLoading}
          />
          <div className="flex items-center gap-1">
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 h-8"
            >
              <Save className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-3 py-1 h-8 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center group w-full">
      <h3
        className="text-lg font-semibold text-slate-900 truncate cursor-pointer hover:text-slate-700 transition-colors duration-200 flex-1"
        onClick={() => setIsEditing(true)}
        title="Click to edit"
      >
        {title}
      </h3>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 px-2 py-1 h-8"
      >
        <PencilIcon className="w-3 h-3 text-slate-400" />
      </Button>
    </div>
  );
}
