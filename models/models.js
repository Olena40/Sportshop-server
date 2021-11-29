import sequelize from "../db.js";
// import { DataTypes } from "sequelize";
import pk from "sequelize";
const { DataTypes } = pk;

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});
console.log(User === sequelize.models.User);

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketGoods = sequelize.define("basket_goods", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const SportGoods = sequelize.define("sport_goods", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const GoodInfo = sequelize.define("good_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketGoods);
BasketGoods.belongsTo(Basket);

Type.hasMany(SportGoods);
SportGoods.belongsTo(Type);

Brand.hasMany(SportGoods);
SportGoods.belongsTo(Brand);

SportGoods.hasMany(Rating);
Rating.belongsTo(SportGoods);

SportGoods.hasMany(BasketGoods);
BasketGoods.belongsTo(SportGoods);

SportGoods.hasMany(GoodInfo);
GoodInfo.belongsTo(SportGoods);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export default {
  User,
  Basket,
  BasketGoods,
  SportGoods,
  Type,
  Brand,
  Rating,
  TypeBrand,
  GoodInfo,
};
