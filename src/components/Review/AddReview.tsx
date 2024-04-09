"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Routes from "@/lib/routes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useCookies } from "next-client-cookies";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddReviewProps {
  id: number;
  metrics: any;
  learner_id: number;
}

const schema = z.object({
  assignment_metric_id: z.string(),
  note: z.string().min(3),
  score: z.number().min(0).max(10),
});

type FormFields = z.infer<typeof schema>;

const AddReview: FC<AddReviewProps> = ({ id, metrics, learner_id }) => {
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const mentorToken = useCookies().get("mentorToken");

  const { mutate: reviewMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      data.score = score;
      const newData = { ...data, learner_id };
      const response = await axios.post(Routes.MENTOR_ADD_REVIEW(id), newData, {
        headers: {
          Authorization: `Bearer ${mentorToken}`,
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
        title: "Review added successfully.",
        description: "The review has been added to the submission.",
      });
      reset();
      router.refresh();
    },
  });
  const form = useForm<FormFields>({
    defaultValues: {
      assignment_metric_id: "0",
      note: "",
      score: 0,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Add a review for this submission.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit((e) => reviewMutation(e))}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="assignment_metric_id"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Metric</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a metric" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="col-span-3">
                        <SelectItem value="0">Select a metric</SelectItem>
                        {metrics.map((metric: any) => (
                          <SelectItem key={metric.id} value={`${metric.id}`}>
                            {metric.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="score" className="text-right">
                  Score
                </Label>
                <Slider
                  onValueChange={(value) => setScore(value[0])}
                  id="score"
                  min={0}
                  max={10}
                  defaultValue={[score]}
                  className="col-span-3"
                />
                <Label htmlFor="score" className="text-right">
                  {score}
                </Label>
                {errors.score && (
                  <p className="col-span-4 text-red-500 text-sm">
                    {errors.score.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Note
                </Label>
                <Textarea
                  {...register("note")}
                  id="name"
                  className="col-span-3"
                />
                {errors.note && (
                  <p className="text-red-500 text-sm">Note is required</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
