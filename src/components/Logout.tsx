"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface logoutProps {}

const Logout: FC<logoutProps> = ({}) => {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = `adminToken=; path=/;`;
    document.cookie = `name=; path=/;`;
    router.push("/admin/login");
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
