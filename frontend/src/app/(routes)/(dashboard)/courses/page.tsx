import { Button } from "@chakra-ui/react";
import React from "react";
import CreateCourseBtn from "./create/_components/CreateCourseBtn";

export default function CoursesPage() {
  return (
    <div className="flex justify-end mx-5">
      <CreateCourseBtn />
    </div>
  );
}
