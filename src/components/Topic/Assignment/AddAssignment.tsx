"use client";
import { FC } from "react";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { useCookies } from "next-client-cookies";
import { Textarea } from "../../ui/textarea";
import Routes from "@/lib/routes";

interface AddAssignmentProps {
  topicId: number;
}

type FormFields = {
  title: string;
  description: string;
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const AddAssignment: FC<AddAssignmentProps> = ({ topicId }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const { mutate: trackMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_ASSIGNMENT_TO_TOPIC(topicId),
        data,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

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
        description: "Assignment added successfully.",
      });
      reset();

      router.refresh();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit((e) => trackMutation(e))}>
      <div className="grid gap-2 mt-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter title"
          required
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}
      </div>
      <div className="grid gap-2 mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description"
          required
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddAssignment;
