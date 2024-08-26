import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not signed in");
  }
  return {
    userId,
  };
};

export const uploadRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((data) => {
      console.log("upload completed", data);
    }),
  courseAttachment: f(["text", "video", "audio", "pdf", "text/markdown"])
    .middleware(() => handleAuth())
    .onUploadComplete((data) => {
      console.log("upload completed", data);
    }),
  courseVideo: f({
    video: {
      maxFileCount: 1,
      maxFileSize: "8GB",
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((data) => {
      console.log("upload completed", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
