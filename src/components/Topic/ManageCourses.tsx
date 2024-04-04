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
import { Course } from "@/types/types";

interface ManageCoursesProps {
  id: number;
}

type FormFields = {
  course_id: number;
};

const schema = z.object({
  course_id: z.string(),
});

const ManageCourses: FC<ManageCoursesProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get(
        Routes.GET_COURSES_BY_TOPIC(id),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      return response.data.courses as Course[];
    },
    enabled: !!adminToken,
  });

  const { data: allCourses } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_COURSES, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.courses as Course[];
    },
    enabled: !!adminToken,
  });

  const { mutate: courseMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_COURSE_TO_TOPIC(id),
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
        description: "Course added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeCourseMutation } = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await axios.post(
        Routes.REMOVE_COURSE_FROM_TOPIC(id),
        {
          course_id: courseId,
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
        description: "Course removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      course_id: 0,
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
        {/* <TableCaption>Learning Tracks</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeCourseMutation(course.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {courses?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No courses found</TableCell>
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
            name="course_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
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
                    {allCourses?.map((course) => (
                      <SelectItem key={course.id} value={`${course.id}`}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Add a course to this topic
                </FormDescription>
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

export default ManageCourses;
