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
