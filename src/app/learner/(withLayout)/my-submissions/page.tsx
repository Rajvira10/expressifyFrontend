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
  const learnerToken = cookies().get("learnerToken")?.value;

  const data = await axios.get(Routes.LEARNER_GET_MY_SUBMISSIONS, {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const submissions: Submission[] = data.data.submissions;

  if (submissions.length > 0) {
    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">My Submissions</h1>
        </div>

        <DataTable columns={columns} data={submissions} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Submissions</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have not submitted any assignments yet.
          </h3>
          <p className="text-sm text-muted-foreground">
            Submit your assignments to track your progress.
          </p>
        </div>
      </div>
    </Suspense>
  );
}
