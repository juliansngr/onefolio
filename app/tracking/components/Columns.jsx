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
import { MoreHorizontal, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      console.log(column.getIsSorted());
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const payments = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a3f9c813",
    amount: 200,
    status: "completed",
    email: "lisa@example.com",
  },
  {
    id: "c7a88c5e",
    amount: 89,
    status: "failed",
    email: "john.doe@gmail.com",
  },
  {
    id: "6d44aa19",
    amount: 150,
    status: "pending",
    email: "sarah@domain.com",
  },
  {
    id: "e51bb290",
    amount: 75,
    status: "processing",
    email: "nick@webmail.com",
  },
  {
    id: "1a9f329d",
    amount: 300,
    status: "completed",
    email: "chris@example.org",
  },
  {
    id: "34dba091",
    amount: 20,
    status: "pending",
    email: "julia@provider.net",
  },
  {
    id: "987acfe2",
    amount: 110,
    status: "completed",
    email: "markus@sample.com",
  },
  {
    id: "41ba99cc",
    amount: 210,
    status: "failed",
    email: "frank@nowhere.de",
  },
  {
    id: "82af104a",
    amount: 95,
    status: "pending",
    email: "steve@example.com",
  },
  {
    id: "f91ec900",
    amount: 180,
    status: "processing",
    email: "elena@web.de",
  },
  {
    id: "6f10e23b",
    amount: 50,
    status: "completed",
    email: "hannah@mail.com",
  },
  {
    id: "59cd771a",
    amount: 140,
    status: "pending",
    email: "oliver@internet.com",
  },
  {
    id: "30b7f885",
    amount: 170,
    status: "processing",
    email: "mia@example.net",
  },
];
