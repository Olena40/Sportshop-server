import { Type } from "../index.js";

export const create = async (req, res) => {
  const { name } = req.body;
  const type = await Type.create({ name });
  return res.json(type);
};

export const getAll = async (req, res) => {
  const types = await Type.findAll();
  return res.json(types);
};

export const destroy = async (req, res) => {
  const { name } = req.body;
  const type = await Type.destroy({ where: { name: value } });
  return res.json({ message: "Deleted successfully" });
};

/* export const destroy = async (req,res) => { 
  const { name } = req.params;   
  Type.destroy({
      where: {
          name: req.params.name
      }
  })
  res.status(200).json({message:"Deleted successfully"});
 
  */
