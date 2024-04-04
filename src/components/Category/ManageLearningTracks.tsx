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
import { LearningTrack } from "@/types/types";

interface ManageLearningTracksProps {
  id: number;
}

type FormFields = {
  learning_track_id: number;
};

const schema = z.object({
  learning_track_id: z.string(),
});

const ManageLearningTracks: FC<ManageLearningTracksProps> = ({
  id,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const adminToken = useCookies().get("adminToken");

  const {
    data: learningTracks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["learningTracks"],
    queryFn: async () => {
      const response = await axios.get(
        Routes.GET_LEARNING_TRACKS_BY_CATEGORY(id),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      return response.data.learning_tracks as LearningTrack[];
    },
    enabled: !!adminToken,
  });

  const { data: allLearningTracks } = useQuery({
    queryKey: ["allLearningTacks"],
    queryFn: async () => {
      const response = await axios.get(Routes.LIST_LEARNING_TRACKS, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      return response.data.learning_tracks as LearningTrack[];
    },
    enabled: !!adminToken,
  });

  const { mutate: categoryMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      const response = await axios.post(
        Routes.ADD_LEARNING_TRACK_TO_CATEGORY(id),
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

  const { mutate: removeTrackMutation } = useMutation({
    mutationFn: async (trackId: number) => {
      const response = await axios.post(
        Routes.REMOVE_LEARNING_TRACK_FROM_CATEGORY(id),
        {
          learning_track_id: trackId,
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
        description: "Learning Track removed successfully.",
      });
      reset();

      router.refresh();
    },
  });

  const form = useForm<FormFields>({
    defaultValues: {
      learning_track_id: 0,
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
        {/* <TableCaption>Learning Tracks</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Track Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {learningTracks?.map((track, index) => (
            <TableRow key={track.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{track.title}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={"destructive"}
                  onClick={() => removeTrackMutation(track.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {learningTracks?.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>No learning tracks found</TableCell>
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
            name="learning_track_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Track</FormLabel>
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
                    {allLearningTracks?.map((track) => (
                      <SelectItem key={track.id} value={`${track.id}`}>
                        {track.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Add a learning track to this category
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

export default ManageLearningTracks;
