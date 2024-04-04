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

import AddLearningTrack from "@/components/LearningTrack/AddLearningTrack";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import { LearningTrack } from "@/types/types";

export const metadata: Metadata = {
  title: "Learning Tracks",
  description: "List of Learning Tracks",
};



export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_LEARNING_TRACKS, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const learningTracks: LearningTrack[] = data.data.learning_tracks;

  if (learningTracks.length > 0) {
    learningTracks.map((learningTrack) => {
      learningTrack.description =
        learningTrack.description.length > 50
          ? learningTrack.description.substring(0, 50) + "..."
          : learningTrack.description;
    });
    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Learning Tracks</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Learning Track</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Learning Track</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddLearningTrack />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={learningTracks} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Learning Tracks</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Learning Track
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding a Learning Track
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Learning Track</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Learning Track</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddLearningTrack />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
