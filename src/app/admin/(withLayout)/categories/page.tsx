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
import AddCategory from "@/components/Category/AddCategory";
import { Category } from "@/types/types";

export const metadata: Metadata = {
  title: "Categories",
  description: "List of Categories",
};



export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_CATEGORIES, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const categories: Category[] = data.data.categories;

  if (categories.length > 0) {
    categories.map((category) => {
      category.description =
        category.description.length > 50
          ? category.description.substring(0, 50) + "..."
          : category.description;
    });

    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Category</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Category</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddCategory />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={categories} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Category
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding a Category
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Category</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Category</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddCategory />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
