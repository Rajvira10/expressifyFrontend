import { Button } from "@/components/ui/button";
import axios from "axios";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import AddTopic from "@/components/Topic/AddTopic";
import { Assignment } from "@/types/types";
import AddAssignment from "@/components/Topic/Assignment/AddAssignment";

export const metadata: Metadata = {
  title: "Assignments",
  description: "List of assignments",
};

export default async function Dashboard({
  params,
}: {
  params: { id: number };
}) {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.GET_ASSIGNMENTS_BY_TOPIC(params.id), {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const assignments: Assignment[] = data.data.assignments;

  if (assignments.length > 0) {
    assignments.map((assignment) => {
      assignment.description =
        assignment.description.length > 50
          ? assignment.description.substring(0, 50) + "..."
          : assignment.description;
    });

    return (
      <Suspense fallback={"Loading..."}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/topics">Topics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Assignments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Assignments</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Assignment</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Assignment</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddAssignment topicId={params.id} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={assignments} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/topics">Topics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Assignments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Assignments</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Assignments
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding an Assignment
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Assignment</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Assignment</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddAssignment topicId={params.id} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
