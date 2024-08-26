export type Course = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  attachments: Attachment[];
  chapters: Chapter[];
  muxDataId: string;
  createdAt: string; // Assuming ISO date string
  updatedAT: string; // Assuming ISO date string
};

export type Category = {
  id: string;
  name: string;
};

export type Option = {
  label: string;
  value: string;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  courseId?: string | null;
  course?: Course | null;
  createdAt: string;
  updatedAT: string;
};

export type Chapter = {
  id: string;
  title: string;
  description?: string | null;
  video: string;
  position: number;
  isPublished: boolean;
  muxData?: MuxData | null;
  courseID: string;
  course: Course;
  userProgress: UserProgress[];
  createdAt: Date;
  updatedAt: Date;
  Attachment?: Attachment | null;
  attachmentId?: string | null;
  muxDataId: string;
};

// MuxData.ts
export type MuxData = {
  id: string;
  chapterId: string;
  assetId: string;
  playbackId: string;
  chapter: Chapter;
};

// UserProgress.ts
export type UserProgress = {
  id: string;
  userId: string;
  chapterId: string;
  chapter: Chapter;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Course.ts (Assuming Course model exists)

// Attachment.ts (Assuming Attachment model exists)
