import axios from "axios";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import { Submission } from "@/types/types";

export const metadata: Metadata = {
  title: "My Submissions",
  description: "List of my submissions",
};

export default async function MySubmissions() {
  const mentorToken = cookies().get("mentorToken")?.value;

  const data = await axios.get(Routes.MENTOR_GET_MY_SUBMISSIONS, {
    headers: {
      Authorization: `Bearer ${mentorToken}`,
    },
  });
  

  const submissions: Submission[] = data.data.submissions;

  if (submissions.length > 0) {
    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Submissions</h1>
        </div>

        <DataTable columns={columns} data={submissions} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Submissions</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have not received any submissions to grade yet.
          </h3>
          <p className="text-sm text-muted-foreground">
            Check back later to view submissions.
          </p>
        </div>
      </div>
    </Suspense>
  );
}
