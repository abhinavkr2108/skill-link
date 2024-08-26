import { Category, Course } from "@/lib/types";
import React from "react";
import ErrorPage from "./ErrorPage";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import ImageForm from "./ImageForm";
import CategoryForm from "./CategoryForm";
import { FileText, LayoutDashboard, ListChecks } from "lucide-react";
import AttachmentsForm from "./AttachmentsForm";
import ChaptersForm from "./ChaptersForm";

interface CreateCourseFormProps {
  course: Course;
  categories: Category[];
}
export default function CreateCourseForm({
  course,
  categories,
}: CreateCourseFormProps) {
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
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
        mr={5}
      >
        <Box>
          <Box className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-sky-400" />
            <Heading size={"md"}>Customize Your Course</Heading>
          </Box>
          <Box>
            <TitleForm initialData={course} />
            <DescriptionForm initialData={course} />
            <ImageForm initialData={course} />
            <CategoryForm
              initialData={course}
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />
          </Box>
        </Box>
        <Box className="space-y-6">
          <Box>
            <Box className="flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-sky-400" />
              <Heading size={"md"}>Course Chapters</Heading>
            </Box>
            <Box>
              <ChaptersForm initialData={course} />
            </Box>
          </Box>
        </Box>
        <Box className="space-y-6">
          <Box>
            <Box className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-sky-400" />
              <Heading size={"md"}>Resources and Attachments</Heading>
            </Box>
            <AttachmentsForm initialData={course} />
          </Box>
        </Box>
      </SimpleGrid>
    </div>
  );
}
