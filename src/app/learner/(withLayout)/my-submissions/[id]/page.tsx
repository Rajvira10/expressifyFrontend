import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Routes from "@/lib/routes";
import { Submission } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import { FC } from "react";

interface pageProps {
  params: {
    id: number;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { id } = params;
  const learnerToken = cookies().get("learnerToken")?.value;

  const data = await axios.get(Routes.LEARNER_GET_ASSIGNMENT(id), {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const submission: Submission = data.data.submission;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">
          {submission.assignment.title}
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/learner">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/learner/my-submissions">
                My Submissions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{submission.assignment.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <p className="text-gray-700 mb-6">{submission.assignment.description}</p>

      <div className="mb-6 flex space-x-3">
        {submission.assignment.assignment_metrics?.map((metric) => (
          <div key={metric.id} className="mb-4">
            <Badge>{metric.title}</Badge>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">{submission.content}</p>
        <iframe
          src={submission.link}
          className="w-full h-80"
          title="Submission Content"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-gray-700">No reviews yet.</p>
      </div>
    </div>
  );
};

export default page;
