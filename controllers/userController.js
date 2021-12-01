// import { badRequest } from "../error/ApiError.js";
import bcrypt from "bcrypt";
import { User, Basket } from "../index.js";
import jwt from "jsonwebtoken";
// import { underscoredIf } from "sequelize/types/lib/utils";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

// Create registration
export const registration = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Incorrect email or password!" });
  }

  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const basket = await Basket.create({ UserId: user.id });
  const token = generateJwt(user.id, user.email, user.role);
  return res.json({ token });
};

// Create login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "User is not found" });
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "Invalid password entered" });
  }
  const token = generateJwt(user.id, user.email, user.role);
  return res.json({ token });
};

/* export const check = async (req, res) => {
  return res.json({ message: "All right" }); */

export const check = async (req, res, next) => {
  const token = generateJwt(req.user.id, req.user.email, req.user.role);
  return res.json({ token });
};
