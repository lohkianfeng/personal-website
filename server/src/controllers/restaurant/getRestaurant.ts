import { readFile } from "fs/promises";
import path from "path";

import { Request, Response } from "express";

const getRestaurant = async (req: Request, res: Response): Promise<any> => {
  const filePath = path.join(process.cwd(), "data", "restaurant.json");

  const data = await readFile(filePath, "utf-8");

  const restaurants = JSON.parse(data);

  res.status(200).json(restaurants);
};

export default getRestaurant;
