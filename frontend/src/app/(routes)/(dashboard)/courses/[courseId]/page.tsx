import { backendUrl } from "@/constants";
import axios from "axios";
import React from "react";
import CreateCourseForm from "./_components/CreateCourseForm";
import { Course } from "@/lib/types";
import ErrorPage from "./_components/ErrorPage";
import { redirect } from "next/navigation";

interface CourseIdPageProps {
  params: {
    courseId: string;
  };
}

export default async function CourseIdPage({ params }: CourseIdPageProps) {
  const { courseId } = params;
  let course: Course | null = null;
  let error: any = null;

  try {
    const response = await axios.get(`${backendUrl}/courses/${courseId}`);
    course = response.data;
  } catch (err) {
    console.error(err);

    error = err;
  }
  if (!course || course === null) {
    return redirect("/");
  }
  return <div>{course && <CreateCourseForm course={course} />}</div>;
}
