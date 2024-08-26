"use client";
import { Course } from "@/lib/types";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Pencil, PlusCircle } from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface ChaptersFormProps {
  initialData: Course;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export default function ChaptersForm({ initialData }: ChaptersFormProps) {
  // State variables
  //   const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const courseId = initialData.id;

  // Hooks
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  //   const toggleEdit = () => {
  //     setIsEditing((prev) => !prev);
  //   };

  const toggleUpdate = () => {
    setIsUpdating((prev) => !prev);
  };

  const toggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  // Functions
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const values = {
      data: data,
      userId: user?.id,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/courses/${courseId}/chapters`,
        values
      );
      toast({
        title: "Chapter Created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      toggleCreate();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Could not add chapter",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box className="mt-6 p-4 bg-slate-100 rounded-md border">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text size={"md"}>Course Chapters</Text>
        <Button
          size={"sm"}
          onClick={toggleCreate}
          variant={"ghost"}
          leftIcon={<PlusCircle />}
        >
          {isCreating ? "Cancel" : "Add a chapter"}
        </Button>
      </Flex>

      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isDisabled={isSubmitting}
                      placeholder="Enter the title of your chapter"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                     This is the title of your course
                   </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Box className="flex items-center gap-x-2">
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Save
              </Button>
            </Box>
          </form>
        </Form>
      )}
      {!isCreating && (
        <Text
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-gray-400 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
        </Text>
      )}
      {!isCreating && (
        <Text className="text-gray-500 font-semibold text-sm mt-8">
          Drag and drop chapters to reorder them
        </Text>
      )}
    </Box>
  );
}
