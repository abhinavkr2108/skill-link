import { Course } from "@/lib/types";
import React from "react";
import ErrorPage from "./ErrorPage";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import ImageForm from "./ImageForm";

interface CreateCourseFormProps {
  course: Course;
}
export default function CreateCourseForm({ course }: CreateCourseFormProps) {
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  // const categories = await db

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <Heading>Course Setup: {course.title}</Heading>
          <span className="text-gray-400 font-bold text-lg">
            Fields Completed: ({completionText})
          </span>
        </div>
      </div>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        mt={10}
        mr={{ base: 5, md: 0 }}
      >
        <Box>
          <Box className="flex items-center gap-2">
            <Heading size={"md"}>Customize Your Course</Heading>
          </Box>
          <Box>
            <TitleForm initialData={course} />
            <DescriptionForm initialData={course} />
            <ImageForm initialData={course} />
          </Box>
        </Box>
      </SimpleGrid>
    </div>
  );
}
