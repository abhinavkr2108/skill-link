"use client";
import { Attachment, Course } from "@/lib/types";
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
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  FileIcon,
  ImageIcon,
  Pencil,
  Plus,
  PlusCircle,
  Trash,
} from "lucide-react";
import axios from "axios";
import { backendUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import FileUpload from "@/components/shared/FileUpload";

interface AttachmentsProps {
  initialData: Course;
}
const formSchema = z.object({
  url: z.string().min(1),
});
export default function AttachmentsForm({ initialData }: AttachmentsProps) {
  // State variables
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const courseId = initialData.id;

  // Hooks
  const toast = useToast();
  const router = useRouter();
  const { user } = useUser();

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
      const response = await axios.post(
        `${backendUrl}/api/courses/${courseId}/attachments`,
        values
      );
      toast({
        title: "Added attachments successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Could not add Attchment",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteAttachment = async (id: string) => {
    try {
      setDeleteId(id);
      await axios.delete(
        `${backendUrl}/api/courses/${courseId}/attachments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.id}`,
          },
        }
      );
      toast({
        title: "Removed attachment successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Could not remove Attchment",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };
  return (
    <Box className="mt-6 p-4 bg-slate-100 rounded-md border">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text size={"md"}>Course Attachments</Text>
        <Button
          size={"sm"}
          onClick={toggleEdit}
          variant={"ghost"}
          leftIcon={<PlusCircle />}
        >
          {isEditing && "Cancel"}
          {!isEditing && "Add Attachment"}
        </Button>
      </Flex>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <Text className="text-gray-400 font-semibold italic">
              No Attachments
            </Text>
          )}
          {initialData.attachments.length > 0 && (
            <Box>
              {initialData.attachments.map((attachment: Attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-2 w-full bg-sky-100 border-sky-200 border rounded-md"
                >
                  <FileIcon className="w-6 h-6 text-sky-400" />
                  <Text className="ml-2 line-clamp-1">{attachment.name}</Text>
                  {deleteId === attachment.id && (
                    <div>
                      <Spinner />
                    </div>
                  )}
                  {deleteId !== attachment.id && (
                    <div>
                      <IconButton
                        aria-label="remove-attachment"
                        variant={"ghost"}
                        icon={<Trash />}
                        color={"red"}
                        onClick={() => deleteAttachment(attachment.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </Box>
          )}
        </>
      )}
      {isEditing && (
        <FileUpload
          endPoint="courseAttachment"
          onChange={(url) => {
            if (url) {
              onSubmit({ url: url });
            }
          }}
        />
      )}
    </Box>
  );
}
