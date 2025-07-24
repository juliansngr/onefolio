"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Columns3,
  Link as LinkIcon,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { CreateTrackingLink } from "./CreateTrackingLink";
import { deleteTrackingLink } from "@/lib/trackingFunctions";
import { toast } from "sonner";

export function DataTable({ columns, data, isPro }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedCount} tracking link${
        selectedCount > 1 ? "s" : ""
      }?`
    );

    if (!confirmDelete) return;

    try {
      // Delete all selected tracking links
      await Promise.all(
        selectedRows.map((row) => deleteTrackingLink(row.original.id))
      );

      // Clear selection after successful deletion
      setRowSelection({});

      toast.success(
        `Successfully deleted ${selectedCount} tracking link${
          selectedCount > 1 ? "s" : ""
        }`
      );
    } catch (error) {
      toast.error("Error deleting tracking links: " + error.message);
    }
  };

  if (!isPro || !data || data.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 rounded-xl py-0">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6">
              <LinkIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {!isPro ? "Upgrade to Pro" : "No tracking links yet"}
            </h3>
            <p className="text-slate-600 text-center mb-8 max-w-md">
              {!isPro
                ? "Unlock link tracking to monitor your portfolio performance and see detailed analytics."
                : "Create your first tracking link to start monitoring portfolio visits and engagement."}
            </p>
            <CreateTrackingLink isPro={isPro} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Controls */}
      <div className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 rounded-xl py-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Filter recipients..."
                  value={table.getColumn("recipient")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      .getColumn("recipient")
                      ?.setFilterValue(event.target.value)
                  }
                  className="pl-10 max-w-sm bg-white/80 backdrop-blur-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <Columns3 className="w-4 h-4 mr-2" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl"
                >
                  <DropdownMenuLabel className="text-slate-700">
                    Toggle columns
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize hover:bg-slate-50 focus:bg-slate-50"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CreateTrackingLink isPro={isPro} />
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar - Shows when rows are selected */}
      {selectedCount > 0 && (
        <div className="bg-gradient-to-r from-red-50/80 to-red-100/80 backdrop-blur-sm border border-red-200/60 shadow-lg shadow-red-200/20 rounded-xl py-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-red-800">
                  {selectedCount} link{selectedCount > 1 ? "s" : ""} selected
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRowSelection({})}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100/50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear selection
                </Button>
              </div>
              <Button
                onClick={handleBulkDelete}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg shadow-slate-200/20 rounded-xl overflow-hidden py-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-slate-200/60 bg-slate-50/50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-slate-700 font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-slate-200/60 hover:bg-slate-50/50 transition-colors ${
                    row.getIsSelected() ? "bg-indigo-50/50" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-slate-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {table.getRowModel().rows?.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/60 bg-slate-50/30">
            <div className="text-sm text-slate-600">
              {selectedCount > 0 && (
                <span className="font-medium text-indigo-700 mr-4">
                  {selectedCount} of {table.getFilteredRowModel().rows.length}{" "}
                  selected
                </span>
              )}
              Showing {table.getRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s)
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="text-sm text-slate-600 px-2">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border-slate-200 hover:bg-slate-50"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
