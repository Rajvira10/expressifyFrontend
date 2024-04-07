import Routes from "@/lib/routes";
import { Category } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { cookies } from "next/headers";
import { CiSettings } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function Dashboard() {
  const learnerToken = cookies().get("learnerToken")?.value;

  const data = await axios.get(Routes.LEARNER_LIST_CATEGORIES, {
    headers: {
      Authorization: `Bearer ${learnerToken}`,
    },
  });

  const categories: Category[] = data.data.categories;

  if (categories.length > 0) {
    categories.map((category) => {
      category.description =
        category.description.length > 50
          ? category.description.substring(0, 50) + "..."
          : category.description;
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <CiSettings className="text-4xl mr-2 animate-spin" /> Learning Tracks
        </h1>
        <Link href="/learner/learning-tracks">
          <Button>Explore More</Button>
        </Link>
      </div>
      <h4 className="text-xl">I want to get better at:</h4>
      <div className="grid grid-cols-4 gap-10">
        {categories.map((category) => (
          <Link
            href={`/learner/learning-tracks`}
            key={category.id}
            className="min-h-[200px] w-full flex justify-center items-center p-4 my-4 bg-white border border-black rounded-lg shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Separator />
      <h4 className="text-xl mt-3 flex items-center">
        <IoMdCheckmarkCircleOutline className="mr-2 text-3xl" /> My Progress:
      </h4>
      <div className="grid grid-cols-2 gap-10 mb-10">
        <Card className="p-10">
          <CardContent className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold">
              Leadership and management skills
            </h3>
            <p>Progress: 20%</p>
            <Progress className="border border-black" value={20} />
          </CardContent>
        </Card>
        <Card className="p-10">
          <CardContent className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold">
              Effective communication mastery
            </h3>
            <p>Progress: 70%</p>
            <Progress className="border border-black" value={70} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
