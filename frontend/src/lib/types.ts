export type Course = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: string; // Assuming ISO date string
  updatedAT: string; // Assuming ISO date string
};
