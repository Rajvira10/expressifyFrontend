import axios from "axios";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import { Learner } from "@/types/types";

export const metadata: Metadata = {
  title: "Learners",
  description: "List of learners",
};

export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_LEARNERS, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const learners: Learner[] = data.data.learners;

  if (learners.length > 0) {
    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Learners</h1>
        </div>

        <DataTable columns={columns} data={learners} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Learners</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Learner
          </h3>
        </div>
      </div>
    </Suspense>
  );
}
