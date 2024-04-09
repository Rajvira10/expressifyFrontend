import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Routes from "@/lib/routes";
import { Review, Submission } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import { FC } from "react";

import AddReview from "@/components/Review/AddReview";
import { Separator } from "@/components/ui/separator";

interface pageProps {
  params: {
    id: number;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { id } = params;
  const mentorToken = cookies().get("mentorToken")?.value;

  const data = await axios.get(Routes.MENTOR_GET_SUBMISSION(id), {
    headers: {
      Authorization: `Bearer ${mentorToken}`,
    },
  });

  const submission: Submission = data.data.submission;

  const allReviews = await axios.get(
    Routes.MENTOR_GET_REVIEWS_OF_SUBMISSION(submission.id),
    {
      headers: {
        Authorization: `Bearer ${mentorToken}`,
      },
    }
  );

  const reviews: any = allReviews.data.reviews;

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
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <AddReview
            id={submission.id}
            metrics={submission.assignment.assignment_metrics}
            learner_id={submission.learner_id}
          />
        </div>
        <div className="text-gray-700">
          {Object.keys(reviews).length > 0 ? (
            Object.keys(reviews).map((metric: any, index: number) => (
              <Accordion key={index} className="mb-6" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {metric} - (Average Score:{" "}
                    {reviews[metric].average_score.toFixed(2)}/10)
                  </AccordionTrigger>
                  <AccordionContent>
                    {reviews[metric].reviews.map((review: Review) => (
                      <div
                        key={review.id}
                        className="col-span-3 bg-white rounded-lg shadow-md p-4"
                      >
                        <h4 className="font-bold">
                          {review.mentor.first_name +
                            " " +
                            review.mentor.last_name}
                        </h4>
                        <p className="text-gray-700 mb-2">{review.note}</p>
                        <p>Score: {review.score}/10</p>
                        <Separator />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
