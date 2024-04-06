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
import { LearningMaterial } from "@/types/types";
import AddLearningMaterial from "@/components/Topic/LearningMaterial/AddLearningMaterial";

export const metadata: Metadata = {
  title: "Learning Materials",
  description: "List of learning materials",
};

export default async function Dashboard({
  params,
}: {
  params: { id: number };
}) {
  const adminToken = cookies().get("adminToken")?.value;

  const data = await axios.get(Routes.GET_LEARNING_MATERIALS_BY_TOPIC(params.id), {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const learning_materials: LearningMaterial[] = data.data.learning_materials;

  if (learning_materials.length > 0) {
    learning_materials.map((learning_material) => {
      learning_material.description =
        learning_material.description.length > 50
          ? learning_material.description.substring(0, 50) + "..."
          : learning_material.description;
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
              <BreadcrumbPage>Learning Materials</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Learning Materials</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Learning Material</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Learning Material</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddLearningMaterial topicId={params.id} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <DataTable columns={columns} data={learning_materials} />
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
            <BreadcrumbPage>Learning Materials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Learning Materials</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Learning Materials
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding a Learning Material
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mt-4">Add Learning Material</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <h2>Add Learning Material</h2>
                </SheetTitle>
                <SheetDescription>
                  <AddLearningMaterial topicId={params.id} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Suspense>
  );
}
