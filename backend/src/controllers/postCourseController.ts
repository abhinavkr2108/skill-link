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

export async function updateCourseData(req: Request, res: Response) {
  try {
    const values = await req.body;
    const { data, userId } = values;
    const { courseId } = req.params;

    if (!data) {
      return res.status(500).json("Cannot Find Data");
    }
    if (!userId || userId === undefined) {
      return res.status(500).json("Cannot Find UserID");
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...data,
      },
    });

    return res.status(200).json(course);
  } catch (error) {
    console.log("UPDATE TITLE ERROR", error);
    return res.status(500).json("Something went wrong");
  }
}

export async function addAttachments(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const values = await req.body;
    const { userId, data } = values;
    if (!userId || userId === undefined) {
      return res.status(500).json("Cannot Find User: Unauthorized");
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return res.status(500).json("Cannot add Attachments: Unauthorized");
    }

    const attachment = await db.attachment.create({
      data: {
        url: data.url,
        name: data.url.split("/").pop(),
        courseId: courseId,
      },
    });

    return res.status(200).json(attachment);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function removeAttachment(req: Request, res: Response) {
  try {
    const { attachmentId } = req.params;
    const { courseId } = req.params;
    const userId = req.headers.authorization?.split(" ")[1];

    if (!attachmentId) {
      return res.status(500).json("Attachment not found");
    }
    if (!courseId) {
      return res.status(500).json("Course not found");
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return res.status(500).json("Cannot remove Attachment: Unauthorized");
    }

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId: courseId,
      },
    });

    return res.status(200).json(attachment);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addChapterTitle(req: Request, res: Response) {
  try {
    const { data, userId } = req.body;
    const { courseId } = req.params;
    const title = data.title;

    if (!userId) {
      return res.status(500).json("Cannot Find UserID");
    }
    if (!courseId) {
      return res.status(500).json("Cannot Find CourseID");
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return res.status(500).json("Cannot Find Course: Unauthorized");
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseID: courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title: title,
        position: newPosition,
        courseID: courseId,
      },
    });

    return res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json(error);
  }
}
