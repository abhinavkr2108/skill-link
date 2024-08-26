"use client";
import { Course, Option } from "@/lib/types";
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
import { ComboboxDemo } from "@/components/ui/combobox";

interface DescriptionFormProps {
  initialData: Course;
  options: Option[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export default function CategoryForm({
  initialData,
  options,
}: DescriptionFormProps) {
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
      categoryId: initialData.categoryId ?? "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  // Functions
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

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
        title: "Course Category updated",
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

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );
  return (
    <Box className="mt-6 p-4 bg-slate-100 rounded-md border">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text size={"md"}>Course Category</Text>
        <Button
          size={"sm"}
          onClick={toggleEdit}
          variant={"ghost"}
          leftIcon={<Pencil />}
        >
          {isEditing ? "Cancel" : "Edit Category"}
        </Button>
      </Flex>
      {!isEditing && (
        <Text
          size={"sm"}
          className={`mt-2 ${
            !initialData.categoryId && "text-slate-500 font-semibold italic"
          }`}
        >
          {selectedOption?.label || "No Category"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxDemo options={options} {...field} />
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
