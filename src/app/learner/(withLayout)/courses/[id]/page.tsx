import Routes from "@/lib/routes";
import { Assignment, LearningMaterial, Topic } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { FC } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AssignmentCard from "@/components/Assignment/AssignmentCard";

interface CoursesProps {
  params: {
    id: number;
  };
}

const Courses: FC<CoursesProps> = async ({ params }) => {
  const learnerToken = cookies().get("learnerToken")?.value;

  const course = await axios.get(Routes.LEARNER_GET_COURSE(params.id), {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const data = await axios.get(Routes.LEARNER_GET_TOPICS_BY_COURSE(params.id), {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const topics: Topic[] = data.data.topics;

  console.log(topics);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="flex items-center text-xl">
          <CiSettings className="text-4xl mr-2 animate-spin" />
          Learning Track
        </h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/learner">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/learner/learning-tracks">
                Learning Tracks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{course.data.course.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center">
        <IoMdCheckmarkCircleOutline className="text-4xl mr-2" />
        <div className="flex justify-between items-center ">
          Course Progress :{" "}
          <Progress
            className="mx-2 border border-black w-[300px]"
            value={course.data.course.progress_percentage}
          />{" "}
          {course.data.course.progress_percentage.toFixed(2)}%
        </div>
      </div>
      <h1 className="flex items-center font-bold text-xl">
        {course.data.course.title}
      </h1>
      <h3>{course.data.course.description}</h3>
      <Tabs defaultValue={`${topics[0]?.id}`} className="w-full">
        <TabsList>
          {topics.map((topic) => (
            <div key={topic.id}>
              <TabsTrigger value={`${topic.id}`} className="min-w-[200px]">
                {topic.title}
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
        {topics.map((topic) => (
          <TabsContent key={topic.id} value={`${topic.id}`}>
            {topic.description}
            <Card className="mt-3">
              <CardContent>
                <div>
                  <h3 className="text-lg font-semibold my-5">
                    Learning Materials
                  </h3>
                  {topic.learning_materials?.map((material) => (
                    <div key={material.id} className="mb-4">
                      <h4 className="text-md font-medium mb-1">
                        {material.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {material.description}
                      </p>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={`${material.link}`}
                          allowFullScreen
                          title={material.title}
                          className="w-full h-[300px]"
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Assignment */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Assignments</h3>
                  <div className="grid grid-cols-2 gap-10">
                    {topic.assignments?.map((assignment, index) => (
                      <AssignmentCard key={index} assignment={assignment} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default Courses;
