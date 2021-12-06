import { Post } from "../index.js";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import path from "path";
const __dirname = path.resolve();

export const create = async (req, res, next) => {
  try {
    const { name, description, categoryId, username } = req.body;
    const { photo } = req.files;
    let fileName = uuidv4() + ".jpeg";
    photo.mv(path.resolve(__dirname, "static", fileName));

    const post = await Post.create({
      name,
      description,
      categoryId,
      username,
      photo: fileName,
    });
    return res.json(post);
  } catch (e) {
    next(e);
    console.log(e);
    res.status(400).json({ message: "Error" });
  }
};

export const getAll = async (req, res) => {
  let { categoryId } = req.query;

  let posts;
  if (!categoryId) {
    posts = await Post.findAndCountAll();
  }

  if (categoryId) {
    posts = await Post.findAndCountAll({
      where: { categoryId },
    });
  }
  return res.json(posts);
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id },
  });
  return res.json(post);
};
