import { Request, Response } from "express";
import { db } from "../constants";

export async function getCourseDetailsById(req: Request, res: Response) {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(500).json("Course ID not found");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return res.redirect("/");
  }
  return res.status(200).json(course);
}
