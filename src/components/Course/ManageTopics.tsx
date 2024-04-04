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
import { Topic } from "@/types/types";

interface ManageTopicsProps {
  id: number;
}

type FormFields = {
  topic_id: number;
};

const schema = z.object({
  topic_id: z.string(),
});

const ManageTopics: FC<ManageTopicsProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await axios.get(Routes.GET_TOPICS_BY_COURSE(id), {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data.topics as Topic[];
    },
    enabled: !!adminToken,
  });

  const { data: allTopics } = useQuery({
    queryKey: ["allTopics"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_TOPICS, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.topics as Topic[];
    },
    enabled: !!adminToken,
  });

  const { mutate: courseMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(Routes.ADD_TOPIC_TO_COURSE(id), data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

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
        description: "Topic added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeTopicMutation } = useMutation({
    mutationFn: async (topicId: number) => {
      const response = await axios.post(
        Routes.REMOVE_TOPIC_FROM_COURSE(id),
        {
          topic_id: topicId,
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
        description: "Topic removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      topic_id: 0,
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, reset } = form;

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-sm">An error occurred: {error.message}</p>
    );

  return (
    <>
      <Table>
        {/* <TableCaption>Topics</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Topic Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics?.map((topic, index) => (
            <TableRow key={topic.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{topic.title}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeTopicMutation(topic.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {topics?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No topics found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit((e) => courseMutation(e))}
          className="mt-5 w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="topic_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
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
                    {allTopics?.map((topic) => (
                      <SelectItem key={topic.id} value={`${topic.id}`}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Add a topic to this course</FormDescription>
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

export default ManageTopics;
