"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course } from "./page";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useState } from "react";
import DeleteCourse from "@/components/Course/DeleteCourse";
import EditCourse from "@/components/Course/EditCourse";
import ManageLearningTracks from "@/components/Course/ManageLearningTracks";
import ManageTopics from "@/components/Course/ManageTopics";

export const columns: ColumnDef<Course>[] = [
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
                  <SheetTrigger>Manage Learning Tracks</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        <h2>Manage Learning Tracks</h2>
                      </SheetTitle>
                      <SheetDescription>
                        <ManageLearningTracks id={row.row.original.id} />
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Sheet>
                  <SheetTrigger>Manage Topics</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        <h2>Manage Topics</h2>
                      </SheetTitle>
                      <SheetDescription>
                        <ManageTopics id={row.row.original.id} />
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
                        <h2>Edit Course</h2>
                      </DialogTitle>
                      <DialogDescription>
                        <EditCourse
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

                      <DeleteCourse
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
