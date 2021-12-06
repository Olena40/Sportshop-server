import { Category } from "../index.js";

export const create = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  return res.json(category);
};

export const getAll = async (req, res) => {
  const categories = await Category.findAll();
  return res.json(categories);
};
