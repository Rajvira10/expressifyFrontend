"use client";
import Routes from "@/lib/routes";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useToast } from "./ui/use-toast";

interface logoutProps {}

const MentorLogout: FC<logoutProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const mentorToken = useCookies().get("mentorToken");

  const handleLogout = async () => {
    await axios.get(Routes.MENTOR_LOGOUT, {
      headers: {
        Authorization: `Bearer ${mentorToken}`,
      },
    });
    document.cookie = `mentorToken=; path=/;`;
    document.cookie = `name=; path=/;`;
    router.push("/mentor/login");
    return toast({
      title: "You have successfully logged out.",
      description: "Goodbye!",
    });
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default MentorLogout;
