import { Sportgood, SportgoodInfo } from "../index.js";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import path from "path";
const __dirname = path.resolve();

export const create = async (req, res, next) => {
  try {
    const { name, price, brandId, typeId, rating, info } = req.body;
    const { img } = req.files;
    let fileName = uuidv4() + ".jpeg";
    img.mv(path.resolve(__dirname, "static", fileName));

    const sportgood = await Sportgood.create({
      name,
      price,
      brandId,
      typeId,
      rating,
      img: fileName,
    });

    if (info) {
      info = JSON.parse(info);
      info.forEach((i) =>
        SportgoodInfo.create({
          title: i.title,
          description: i.description,
          sportgoodId: sportgood.id,
        })
      );
    }

    return res.json(sportgood);
  } catch (e) {
    next(e);
    console.log(e);
    res.status(400).json({ message: "Error" });
  }
};

export const getAll = async (req, res) => {
  // let { brandId, typeId } = req.query;
  let { brandId, typeId, limit, page } = req.query;
  page = page || 1;
  limit = limit || 9;
  let offset = page * limit - limit;

  let sportgoods;
  if (!brandId && !typeId) {
    // sportgoods = await Sportgood.findAndCountAll();
    sportgoods = await Sportgood.findAndCountAll({ limit, offset });
  }
  if (brandId && !typeId) {
    sportgoods = await Sportgood.findAndCountAll({
      where: { brandId },
      limit,
      offset,
    });
  }
  if (!brandId && typeId) {
    sportgoods = await Sportgood.findAndCountAll({
      where: { typeId },
      limit,
      offset,
    });
  }
  if (brandId && typeId) {
    sportgoods = await Sportgood.findAndCountAll({
      where: { typeId, brandId },
      limit,
      offset,
    });
  }
  return res.json(sportgoods);
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const sportgood = await Sportgood.findOne({
    where: { id },
    include: [{ model: SportgoodInfo, as: "info" }],
  });
  return res.json(sportgood);
};
