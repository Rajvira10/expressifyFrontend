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
import { GiJourney } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { usePathname } from "next/navigation";

interface MentorSidebarProps {}

const MentorSidebar: FC<MentorSidebarProps> = ({}) => {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/mentor"
            className="flex items-center gap-2 font-semibold"
          >
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
              href="/mentor"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/mentor/submissions"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary-foreground",
                active?.includes("submissions")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <GiJourney className="h-4 w-4" />
              Submissions
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MentorSidebar;
