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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "../ui/separator";
import { AssignmentMetric, Topic } from "@/types/types";
import { Input } from "../ui/input";

interface ManageAssignmentMetricsProps {
  id: number;
}

type FormFields = {
  title: string;
};

const schema = z.object({
  title: z.string(),
});

const ManageAssignmentMetrics: FC<ManageAssignmentMetricsProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: assignment_metrics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assignment_metrics"],
    queryFn: async () => {
      const response = await axios.get(
        Routes.GET_ASSIGNMENT_METRICS_BY_ASSIGNMENT(id),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      return response.data.assignment_metrics as AssignmentMetric[];
    },
    enabled: !!adminToken,
  });

  const { mutate: assignmentMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_ASSIGNMENT_METRIC_TO_ASSIGNMENT(id),
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
        description: "Assignment Metric added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeAssignmentMetricMutation } = useMutation({
    mutationFn: async (assignmentMetricId: number) => {
      const response = await axios.post(
        Routes.REMOVE_ASSIGNMENT_METRIC_FROM_ASSIGNMENT(assignmentMetricId),
        {},
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
        description: "Assignment Metric removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      title: "",
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
          {assignment_metrics?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No topics found</TableCell>
            </TableRow>
          )}
          {assignment_metrics?.map((metric, index) => (
            <TableRow key={metric.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{metric.title}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeAssignmentMetricMutation(metric.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit((e) => assignmentMutation(e))}
          className="mt-5 w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
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

export default ManageAssignmentMetrics;
