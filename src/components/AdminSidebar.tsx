"use client";
import {
  Bell,
  BookA,
  Home,
  LineChart,
  Package2,
  TrainTrack,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { GiTeacher } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { MdTopic } from "react-icons/md";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {}

const AdminSidebar: FC<AdminSidebarProps> = ({}) => {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Expressify</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              href="/admin/categories"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("categories")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <TbCategory className="h-4 w-4" />
              Categories
            </Link>

            <Link
              href="/admin/learning-tracks"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("learning-tracks")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <TrainTrack className="h-4 w-4" />
              Learning Tracks
            </Link>
            <Link
              href="/admin/courses"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("courses")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <BookA className="h-4 w-4" />
              Courses{" "}
            </Link>

            <Link
              href="/admin/topics"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("topics") ||
                  active?.includes("assignments") ||
                  active?.includes("learning-materials")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <MdTopic className="h-4 w-4" />
              Topics
            </Link>

            <Link
              href="/admin/learners"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("learners")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              Learners
            </Link>
            <Link
              href="/admin/mentors"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("mentors")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <GiTeacher className="h-4 w-4" />
              Mentors
            </Link>
            <Link
              href="/admin/reports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("reports")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <LineChart className="h-4 w-4" />
              Reports
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
