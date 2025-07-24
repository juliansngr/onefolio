"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ChevronsUpDown,
  Copy,
  Trash2,
  CheckCircle,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTrackingLink } from "@/lib/trackingFunctions";
import { toast } from "sonner";

export const columns = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="border-slate-300"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="border-slate-300"
        />
      );
    },
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell: ({ row }) => {
      const recipient = row.getValue("recipient");
      return <div className="font-medium text-slate-900">{recipient}</div>;
    },
  },
  {
    accessorKey: "link_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-100 text-slate-700 font-semibold p-0 h-auto"
        >
          Link ID
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const linkId = row.getValue("link_id");
      return (
        <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded max-w-24 truncate">
          {linkId}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at");
      return (
        <div className="text-sm text-slate-600">
          {new Date(createdAt).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "was_clicked",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-100 text-slate-700 font-semibold p-0 h-auto"
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const wasClicked = row.getValue("was_clicked");
      return (
        <div className="flex justify-center">
          {wasClicked ? (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3 h-3" />
              Clicked
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <X className="w-3 h-3" />
              Pending
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "was_clicked_at",
    header: "Clicked At",
    cell: ({ row }) => {
      const wasClickedAt = row.getValue("was_clicked_at");
      return (
        <div className="text-sm text-slate-600">
          {wasClickedAt
            ? new Date(wasClickedAt).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "–"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const linkItem = row.original;

      const handleCopy = () => {
        const link =
          "https://" +
          linkItem.username +
          ".onefol.io/" +
          "?tr=" +
          linkItem.link_id;
        navigator.clipboard.writeText(link);
        toast.success("Tracking link copied to clipboard!");
      };

      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this tracking link?"
        );
        if (!confirmDelete) return;

        try {
          await deleteTrackingLink(linkItem.id);
          toast.success("Tracking link deleted successfully");
        } catch (err) {
          toast.error("Error deleting link: " + err.message);
        }
      };

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl"
            >
              <DropdownMenuLabel className="text-slate-700">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={handleCopy}
                className="hover:bg-indigo-50 focus:bg-indigo-50 text-indigo-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy tracking link
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem
                onClick={handleDelete}
                className="hover:bg-red-50 focus:bg-red-50 text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
