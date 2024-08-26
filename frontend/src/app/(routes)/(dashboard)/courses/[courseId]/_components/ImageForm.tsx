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
import { ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import FileUpload from "@/components/shared/FileUpload";

interface ImageFormProps {
  initialData: Course;
}
const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
});
export default function ImageForm({ initialData }: ImageFormProps) {
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
      imageUrl: initialData.imageUrl ?? "",
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
        title: "Course Image updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Could not upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box className="mt-6 p-4 bg-slate-100 rounded-md border">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text size={"md"}>Course Image</Text>
        <Button
          size={"sm"}
          onClick={toggleEdit}
          variant={"ghost"}
          leftIcon={initialData.imageUrl ? <Pencil /> : <PlusCircle />}
        >
          {!isEditing && !initialData.imageUrl && "Upload Image"}
          {!isEditing && initialData.imageUrl && "Edit Image"}
        </Button>
      </Flex>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <Box className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500 font-bold" />
          </Box>
        ) : (
          <Box className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </Box>
        ))}
      {isEditing && (
        <FileUpload
          endPoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      )}
    </Box>
  );
}
