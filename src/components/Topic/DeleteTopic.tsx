"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "next-client-cookies";
import { AlertDialogAction } from "../ui/alert-dialog";
import Routes from "@/lib/routes";

interface DeleteTopicProps {
  id: number;
  onClose: () => void;
}

const DeleteTopic: FC<DeleteTopicProps> = ({ id, onClose }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const { mutate: trackMutation, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        Routes.DELETE_TOPIC(id),
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      onClose();

      return response.data;
    },
    onError: (err) => {
      return toast({
        title: "There was an error.",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Topic deleted successfully.",
      });
      router.refresh();
    },
  });
  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  return (
    <AlertDialogAction
      disabled={isPending}
      onClick={handleSubmit(() => trackMutation())}
    >
      Delete
    </AlertDialogAction>
  );
};

export default DeleteTopic;
