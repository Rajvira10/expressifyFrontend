"use client";
import Routes from "@/lib/routes";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useToast } from "./ui/use-toast";

interface logoutProps {}

const Logout: FC<logoutProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const handleLogout = async () => {
    await axios.get(Routes.ADMIN_LOGOUT, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    document.cookie = `adminToken=; path=/;`;
    document.cookie = `name=; path=/;`;
    router.push("/admin/login");
    return toast({
      title: "You have successfully logged out.",
      description: "Goodbye!",
    });
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
