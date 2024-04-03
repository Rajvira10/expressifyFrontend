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
import AddTopic from "@/components/Topic/AddTopic";

export const metadata: Metadata = {
  title: "Topics",
  description: "List of topics",
};

export type Topic = {
  id: number;
  title: string;
  description: string;
};

export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_TOPICS, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const topics: Topic[] = data.data.topics;

  if (topics.length > 0) {
    topics.map((Topic) => {
      Topic.description =
        Topic.description.length > 50
          ? Topic.description.substring(0, 50) + "..."
          : Topic.description;
    });

    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Topics</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Topic</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Topic</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddTopic />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={topics} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Topics</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Topic
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding a Topic
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Topic</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Topic</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddTopic />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
