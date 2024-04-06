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
import { Learner } from "@/types/types";

interface ManageLearnersProps {
  id: number;
}

type FormFields = {
  learner_id: number;
};

const schema = z.object({
  learner_id: z.string(),
});

const ManageLearners: FC<ManageLearnersProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: learners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["learners"],
    queryFn: async () => {
      const response = await axios.get(Routes.GET_LEARNERS_BY_MENTOR(id), {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      return response.data.learners as Learner[];
    },
    enabled: !!adminToken,
  });

  const { data: allLearners } = useQuery({
    queryKey: ["allLearners"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_LEARNERS, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.learners as Learner[];
    },
    enabled: !!adminToken,
  });

  const { mutate: learnerMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_LEARNER_TO_MENTOR(id),
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
        description: "Learner added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeLearnerMutation } = useMutation({
    mutationFn: async (learnerId: number) => {
      const response = await axios.post(
        Routes.REMOVE_LEARNER_FROM_MENTOR(id),
        {
          learner_id: learnerId,
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
        description: "Learner removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      learner_id: 0,
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
            <TableHead>Learner Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {learners?.map((learner, index) => (
            <TableRow key={learner.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {learner.first_name} {learner.last_name}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeLearnerMutation(learner.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {learners?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No learners found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit((e) => learnerMutation(e))}
          className="mt-5 w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="learner_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learner</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a learner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allLearners?.map((learner) => (
                      <SelectItem key={learner.id} value={`${learner.id}`}>
                        {learner.first_name} {learner.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Add a learner to this learner</FormDescription>
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

export default ManageLearners;
