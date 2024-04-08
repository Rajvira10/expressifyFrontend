import Routes from "@/lib/routes";
import { Category, Course } from "@/types/types";
import axios from "axios";
import { BookA } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { FC } from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdTopic } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface LearningTracksProps {
  params: {
    id: number;
  };
}

const LearningTracks: FC<LearningTracksProps> = async ({ params }) => {
  const { id } = params;

  const learnerToken = cookies().get("learnerToken")?.value;

  const learningTrack = await axios.get(Routes.LEARNER_GET_LEARNING_TRACK(id), {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const data = await axios.get(
    Routes.LEARNER_GET_COURSES_BY_LEARNING_TRACK(id),
    {
      headers: {
        Authorization: `Bearer ${learnerToken}`,
      },
    }
  );

  const courses: Course[] = data.data.courses;

  const totalTopics = courses.reduce((acc, course) => {
    return acc + (course.topics ? course.topics.length : 0);
  }, 0);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="flex items-center text-xl">
          <CiSettings className="text-4xl mr-2 animate-spin" />
          Learning Track {learningTrack.data.learning_track.title}
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
              <BreadcrumbPage>
                {learningTrack.data.learning_track.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <p>{learningTrack.data.learning_track.description}</p>
      <div className="flex align-center space-x-5">
        <div className="flex align-center">
          <BookA className="h-6 w-6 mr-2" />
          {courses.length} Courses
        </div>
        <div className="flex align-center">
          <MdTopic className="h-6 w-6 mr-2" />
          {totalTopics} Topics
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {courses.map((course) => (
          <>
            {course.topics?.length == 0 ? (
              <div
                key={course.id}
                className="min-h-[200px] w-full flex justify-start items-start p-6 my-4 bg-white border border-black rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>

                  <h1>Will Be Available Soon</h1>
                </div>
              </div>
            ) : (
              <Link
                href={`/learner/courses/${course.id}`}
                key={course.id}
                className="min-h-[200px] w-full flex justify-start items-start p-6 my-4 bg-white border border-black rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>

                  <div className="flex align-center mt-2">
                    <MdTopic className="h-6 w-6 mr-2" />
                    {course.topics?.length} Topics
                  </div>
                </div>
              </Link>
            )}
          </>
        ))}
        {courses.length === 0 && <h1>Courses will be available soon.</h1>}
      </div>
    </>
  );
};

export default LearningTracks;
