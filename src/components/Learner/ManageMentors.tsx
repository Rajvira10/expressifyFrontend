"use client";
import { FC, useState } from "react";

import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useCookies } from "next-client-cookies";
import Routes from "@/lib/routes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "../ui/separator";
import { Mentor } from "@/types/types";

interface ManageMentorsProps {
  id: number;
}

type FormFields = {
  mentor_id: number;
};

const schema = z.object({
  mentor_id: z.string(),
});

const ManageMentors: FC<ManageMentorsProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: mentors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const response = await axios.get(Routes.GET_MENTORS_BY_LEARNER(id), {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data.mentors as Mentor[];
    },
    enabled: !!adminToken,
  });

  const { data: allMentors } = useQuery({
    queryKey: ["allMentors"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_LEARNERS, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.mentors as Mentor[];
    },
    enabled: !!adminToken,
  });

  const { mutate: mentorMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_MENTOR_TO_LEARNER(id),
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
        description: "Mentor added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeMentorMutation } = useMutation({
    mutationFn: async (mentorId: number) => {
      const response = await axios.post(
        Routes.REMOVE_MENTOR_FROM_LEARNER(id),
        {
          mentor_id: mentorId,
        },
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
        description: "Mentor removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      mentor_id: 0,
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = form;

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-sm">An error occurred: {error.message}</p>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Mentor Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors?.map((mentor, index) => (
            <TableRow key={mentor.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {mentor.first_name} {mentor.last_name}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeMentorMutation(mentor.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {mentors?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No mentors found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit((e) => mentorMutation(e))}
          className="mt-5 w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="mentor_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mentor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allMentors?.map((mentor) => (
                      <SelectItem key={mentor.id} value={`${mentor.id}`}>
                        {mentor.first_name} {mentor.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Add a mentor to this learner</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ManageMentors;
