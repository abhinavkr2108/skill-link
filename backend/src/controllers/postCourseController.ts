import { Request, Response } from "express";
import { db } from "../constants";

interface CourseTitleProps {
  data: {
    title: string;
  };
  userId: string | undefined;
}
export async function postCourseTitle(req: Request, res: Response) {
  try {
    const values: CourseTitleProps = await req.body;
    const { data, userId } = values;
    const title = data.title;

    if (!title || !userId || userId === undefined) {
      return res.status(500).json("Cannot Find UserID");
    }

    const course = await db.course.create({
      data: {
        userId: userId,
        title: title,
      },
    });
    console.log("POST TITLE USER", userId);

    return res.status(200).json(course);
  } catch (error) {
    console.log("POST TITLE ERROR", error);
    return res.status(500).json("Something went wrong");
  }
}
