"use client";
import { FC, useEffect, useState } from "react";
import { SheetContent } from "./ui/sheet";
import Link from "next/link";
import {
  Badge,
  BookA,
  Home,
  LineChart,
  Package2,
  TrainTrack,
  Users,
} from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LearnerMobileSidebarProps {}

const LearnerMobileSidebar: FC<LearnerMobileSidebarProps> = ({}) => {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Expressify</span>
        </Link>
        <Link
          href="/admin"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/admin/learning-tracks"
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
            active?.includes("learning-tracks")
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <TrainTrack className="h-5 w-5" />
          Learning Tracks
          {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge> */}
        </Link>
        <Link
          href="/admin/courses"
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
            active?.includes("courses")
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <BookA className="h-5 w-5" />
          Courses{" "}
        </Link>
        <Link
          href="/admin/learners"
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
            active?.includes("learners")
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <Users className="h-4 w-4" />
          Learners
        </Link>
        <Link
          href="/admin/mentors"
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
            active?.includes("mentors")
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <GiTeacher className="h-4 w-4" />
          Mentors
        </Link>
        <Link
          href="/admin/reports"
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
            active?.includes("reports")
              ? "bg-muted text-foreground"
              : "text-muted-foreground"
          )}
        >
          <LineChart className="h-5 w-5" />
          Reports
        </Link>
      </nav>
    </SheetContent>
  );
};

export default LearnerMobileSidebar;
