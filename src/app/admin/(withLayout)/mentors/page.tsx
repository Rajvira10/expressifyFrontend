import axios from "axios";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import Routes from "@/lib/routes";
import { Mentor } from "@/types/types";

export const metadata: Metadata = {
  title: "Mentors",
  description: "List of mentors",
};

export default async function Dashboard() {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.LIST_MENTORS, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const mentors: Mentor[] = data.data.mentors;

  if (mentors.length > 0) {
    return (
      <Suspense fallback={"Loading..."}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Mentors</h1>
        </div>

        <DataTable columns={columns} data={mentors} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Mentors</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Mentor
          </h3>
        </div>
      </div>
    </Suspense>
  );
}
