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
import { Pencil } from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface DescriptionFormProps {
  initialData: Course;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Title is required" }),
});

export default function DescriptionForm({ initialData }: DescriptionFormProps) {
  // State variables
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const courseId = initialData.id;

  // Hooks
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description?.toString() ?? "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Functions
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const values = {
      data: data,
      userId: user?.id,
    };
    try {
      const response = await axios.patch(
        `${backendUrl}/api/courses/${courseId}`,
        values
      );
      toast({
        title: "Description updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Could not update title",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box className="mt-6 p-4 bg-slate-100 rounded-md border">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text size={"md"}>Course Description</Text>
        <Button
          size={"sm"}
          onClick={toggleEdit}
          variant={"ghost"}
          leftIcon={<Pencil />}
        >
          {isEditing ? "Cancel" : "Edit Description"}
        </Button>
      </Flex>
      {!isEditing && (
        <Text
          size={"sm"}
          className={`mt-2 ${
            !initialData.description && "text-slate-500 font-semibold italic"
          }`}
        >
          {initialData.description || "No Description"}
        </Text>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      isDisabled={isSubmitting}
                      placeholder="Enter the description of your course"
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
    </Box>
  );
}
