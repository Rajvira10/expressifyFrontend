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

interface AddLearningMaterialProps {
  topicId: number;
}

type FormFields = {
  title: string;
  description: string;
  link: string;
  type: "Video" | "Document";
};

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  link: z.string().min(1),
  type: z.string().min(1),
});

const AddLearningMaterial: FC<AddLearningMaterialProps> = ({ topicId }) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const { mutate: trackMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_LEARNING_MATERIAL_TO_TOPIC(topicId),
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
        description: "Learning Material added successfully.",
      });
      reset();

      router.refresh();
    },
  });
  const form = useForm<FormFields>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
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
        <div className="grid gap-2 mt-4">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            type="text"
            placeholder="Enter link"
            required
            {...register("link")}
          />
          {errors.link && (
            <p className="text-red-500 text-sm">Link is required</p>
          )}
        </div>
        <div className="mt-2"></div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">Type is required</p>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddLearningMaterial;
