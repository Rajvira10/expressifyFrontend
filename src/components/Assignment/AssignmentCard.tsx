"use client";
import { Assignment } from "@/types/types";
import { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import Routes from "@/lib/routes";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useCookies } from "next-client-cookies";

interface AssignmentCardProps {
  assignment: Assignment;
}

type FormFields = {
  content: string;
  link: string;
  assignment_id: number;
};

const AssignmentCard: FC<AssignmentCardProps> = ({ assignment }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const learnerToken = useCookies().get("learnerToken");

  const { mutate: assignmentMutation, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      data.assignment_id = assignment.id;
      const response = await axios.post(
        Routes.LEARNER_SUBMIT_ASSIGNMENT,
        data,
        {
          headers: {
            Authorization: `Bearer ${learnerToken}`,
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
        title: "Assignment submitted.",
        description: "Your assignment has been submitted successfully.",
      });

      reset();
      setIsOpen(false);
      router.refresh();
    },
  });

  const schema = z.object({
    content: z.string().min(1),
    link: z.string().url(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      content: "",
      link: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  if (assignment.assignment_metrics?.length === 0) {
    return <h1>Will be available soon</h1>;
  }

  return (
    <>
      <Card className="mb-6 p-3">
        <CardContent>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mt-6 mb-2">
              {assignment.title}
            </h4>
            <p className="text-sm text-gray-600 mb-6">
              {assignment.description}
            </p>
            <h4 className="text-md font-semibold py-2">Criteria</h4>
            <ul className="flex space-x-3 pl-5 mb-4">
              {assignment.assignment_metrics?.map((criterion, index) => (
                <li key={index}>
                  <Badge variant="default">{criterion.title}</Badge>
                </li>
              ))}
            </ul>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Submit Assignment</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Assignment</DialogTitle>
                  <DialogDescription>
                    Submit your assignment here.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit((e) => assignmentMutation(e))}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content" className="text-right">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        className="col-span-3"
                        required
                        {...register("content")}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link" className="text-right">
                        Link
                      </Label>
                      <Input
                        id="link"
                        className="col-span-3"
                        type="link"
                        placeholder=""
                        required
                        {...register("link")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={isPending}>
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AssignmentCard;
