"use client";
import { Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateCourseBtn() {
  const router = useRouter();
  const createCourse = () => {
    router.push("/courses/create");
  };
  return (
    <Button colorScheme="blue" leftIcon={<Plus />} onClick={createCourse}>
      Create Course
    </Button>
  );
}
