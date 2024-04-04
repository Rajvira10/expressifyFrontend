"use client";

import { ColumnDef } from "@tanstack/react-table";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import EditLearningTrack from "@/components/LearningTrack/EditLearningTrack";
import { useState } from "react";
import DeleteLearningTrack from "@/components/LearningTrack/DeleteLearningTrack";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ManageCategories from "@/components/LearningTrack/ManageCategories";
import { LearningTrack } from "@/types/types";
import ManageCourses from "@/components/LearningTrack/ManageCourses";

export const columns: ColumnDef<LearningTrack>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: (row) => {
      const ActionsComponent = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [isDeleteOpen, setIsDeleteOpen] = useState(false);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Sheet>
                  <SheetTrigger>Manage Categories</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        <h2>Manage Categories</h2>
                      </SheetTitle>
                      <SheetDescription>
                        <ManageCategories id={row.row.original.id} />
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Sheet>
                  <SheetTrigger>Manage Courses</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        <h2>Manage Courses</h2>
                      </SheetTitle>
                      <SheetDescription>
                        <ManageCourses id={row.row.original.id} />
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                {" "}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger>Edit</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <h2>Edit Learning Track</h2>
                      </DialogTitle>
                      <DialogDescription>
                        <EditLearningTrack
                          id={row.row.original.id}
                          title={row.row.original.title}
                          description={row.row.original.description}
                          onClose={() => setIsOpen(false)}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                  <AlertDialogTrigger>Delete</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your learning track and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <DeleteLearningTrack
                        id={row.row.original.id}
                        onClose={() => setIsOpen(false)}
                      />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      };
      return <ActionsComponent />;
    },
  },
];
