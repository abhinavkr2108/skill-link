import { Request, Response } from "express";
import { db } from "../constants";

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error fetching categories");
  }
}
