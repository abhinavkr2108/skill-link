"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
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
  Button,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { backendUrl } from "@/constants";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  // description: z.string().min(1, { message: "Description is required" }),
});

export default function CreateCoursePage() {
  // Hooks
  const toast = useToast();
  const { user } = useUser();
  const router = useRouter();

  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const values = {
      data: data,
      userId: user?.id,
    };
    console.log("DATA", values);
    console.log("BACKEND URL", backendUrl);
    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/api/courses`, values);
      console.log("RESPONSE", response.data);
      toast({
        title: "Course created",
        description: "Course created successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push(`/courses/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Failed to create course",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto h-full justify-center items-center">
      <Heading>Name Your Course</Heading>
      <Text fontSize={"medium"} color="gray.500" fontWeight={500}>
        What is the title of your course? It can also be changed later
      </Text>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            {...form}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    isDisabled={isSubmitting}
                    placeholder="Ex: Advanced Web Development Course"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading && (
            <div className="flex justify-center my-5">
              <Text>Creating Course...</Text>
              <Spinner />
            </div>
          )}
          <div className="flex items-center gap-x-2">
            <Link href={"/"}>
              <Button colorScheme="red" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              colorScheme="blue"
              isDisabled={!isValid || isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
