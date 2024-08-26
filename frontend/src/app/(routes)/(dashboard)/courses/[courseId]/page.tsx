import { backendUrl } from "@/constants";
import axios from "axios";
import React from "react";
import CreateCourseForm from "./_components/CreateCourseForm";
import { Category, Course } from "@/lib/types";
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
  let categories: Category[] | null = null;

  try {
    const response = await axios.get(`${backendUrl}/courses/${courseId}`);
    course = response.data;
  } catch (err) {
    console.error(err);

    error = err;
  }
  try {
    const response = await axios.get(`${backendUrl}/categories`);
    const categories = response.data;
    console.log("categories", categories);
    console.log(categories);
  } catch (error) {
    console.error(error);
  }
  if (!course || course === null) {
    return redirect("/");
  }
  return <div>{course && <CreateCourseForm course={course} />}</div>;
}
