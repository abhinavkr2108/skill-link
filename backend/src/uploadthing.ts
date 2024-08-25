import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
  courseAttachment: f([
    "text",
    "video",
    "audio",
    "pdf",
    "text/markdown",
  ]).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
  courseVideo: f({
    video: {
      maxFileCount: 1,
      maxFileSize: "8GB",
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
