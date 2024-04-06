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

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import AddCourse from "@/components/Course/AddCourse";
import { Course } from "@/types/types";

export const metadata: Metadata = {
  title: "Courses",
  description: "List of courses",
};

export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_COURSES, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const courses: Course[] = data.data.courses;

  if (courses.length > 0) {
    courses.map((Course) => {
      Course.description =
        Course.description.length > 50
          ? Course.description.substring(0, 50) + "..."
          : Course.description;
    });

    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Course</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Course</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddCourse />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={courses} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Course
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding a Course
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Course</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Course</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddCourse />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
