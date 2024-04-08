"use client";
import Routes from "@/lib/routes";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useToast } from "./ui/use-toast";

interface logoutProps {}

const LearnerLogout: FC<logoutProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const learnerToken = useCookies().get("learnerToken");

  const handleLogout = async () => {
    await axios.get(Routes.LEARNER_LOGOUT, {
      headers: {
        Authorization: `Bearer ${learnerToken}`,
      },
    });
    document.cookie = `learnerToken=; path=/;`;
    document.cookie = `name=; path=/;`;
    router.push("/learner/login");
    return toast({
      title: "You have successfully logged out.",
      description: "Goodbye!",
    });
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default LearnerLogout;
