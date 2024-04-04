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
import { Category } from "@/types/types";

interface ManageCategoriesProps {
  id: number;
}

type FormFields = {
  category_id: number;
};

const schema = z.object({
  category_id: z.string(),
});

const ManageCategories: FC<ManageCategoriesProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        Routes.GET_CATEGORIES_BY_LEARNING_TRACK(id),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      return response.data.categories as Category[];
    },
    enabled: !!adminToken,
  });

  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_CATEGORIES, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.categories as Category[];
    },
    enabled: !!adminToken,
  });

  const { mutate: categoryMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_CATEGORY_TO_LEARNING_TRACK(id),
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
        description: "Category added successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const { mutate: removeCategoryMutation } = useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await axios.post(
        Routes.REMOVE_CATEGORY_FROM_LEARNING_TRACK(id),
        {
          category_id: categoryId,
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
        description: "Category removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      category_id: 0,
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
            <TableHead>Category Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeCategoryMutation(category.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {categories?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No categories found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit((e) => categoryMutation(e))}
          className="mt-5 w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
                    {allCategories?.map((category) => (
                      <SelectItem key={category.id} value={`${category.id}`}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Add a category to this learning track
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

export default ManageCategories;
