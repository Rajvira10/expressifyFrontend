import Routes from "@/lib/routes";
import { Category } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { FC } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

interface CoursesProps {}

const CourseTracks: FC<CoursesProps> = async () => {
  const learnerToken = cookies().get("learnerToken")?.value;

  const data = await axios.get(Routes.LEARNER_LIST_CATEGORIES, {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const categories: Category[] = data.data.categories;

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="flex items-center">
            <IoMdCheckmarkCircleOutline className="text-4xl mr-2" />
            {category.title}
          </h3>
          <div className="grid grid-cols-4 gap-10">
            {category.learning_tracks?.map((track) => (
              <Link
                href={`/learner/learning-tracks/${track.id}`}
                key={track.id}
                className="relative min-h-[200px] w-full flex flex-col justify-center items-center p-4 my-4 bg-white border border-black rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{track.title}</h3>
                </div>
                <div className="absolute flex items-center bottom-2 right-5 font-bold">
                  <FaArrowRightLong className="mr-2" /> Continue
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseTracks;
