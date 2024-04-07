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

  const learningMaterials: LearningMaterial[] = [
    {
      id: 1,
      title: "Introduction to Topic",
      description: "Watch this video to get started with the topic.",
      link: "VIDEO_ID_HERE",
      type: "Video",
    },
    {
      id: 2,
      title: "Deep Dive into Topic",
      description: "A detailed explanation of the topic.",
      link: "VIDEO_ID_HERE",
      type: "Video",
    },
    {
      id: 3,
      title: "Advanced Concepts",
      description: "Explore advanced concepts related to the topic.",
      link: "VIDEO_ID_HERE",
      type: "Video",
    },
  ];

  const assignment: Assignment = {
    id: 1,
    title: "Assignment Title",
    description: "Complete the following assignment",
    assignment_metrics: [
      { id: 1, title: "Criterion 1" },
      { id: 2, title: "Criterion 2" },
      { id: 3, title: "Criterion 3" },
    ],
  };

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
              <BreadcrumbLink href="/learning-tracks">
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
          Track Progress :{" "}
          <Progress className="mx-2 border border-black w-[300px]" value={33} />{" "}
          33%
        </div>
      </div>
      <h1 className="flex items-center font-bold text-xl">
        {course.data.course.title}
      </h1>
      <h3>{course.data.course.description}</h3>
      <Tabs defaultValue={`${topics[0].id}`} className="w-full">
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
                  {learningMaterials.map((material) => (
                    <div key={material.id} className="mb-4">
                      <h4 className="text-md font-medium mb-1">
                        {material.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {material.description}
                      </p>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={`https://www.youtube.com/embed/${material.link}`}
                          allowFullScreen
                          title={material.title}
                          className="w-full h-[300px]"
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Assignment */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Assignment</h3>
                  <h4 className="text-md font-medium mb-1">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {assignment.description}
                  </p>
                  <h4 className="text-md font-medium mb-1">Criteria</h4>
                  <ul className="list-disc pl-5 mb-2">
                    {assignment.assignment_metrics?.map((criterion, index) => (
                      <Badge key={index} variant="default">
                        {criterion.title}
                      </Badge>
                    ))}
                  </ul>
                  <Button className="text-center mt-3">
                    Submit Assignment
                  </Button>
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
