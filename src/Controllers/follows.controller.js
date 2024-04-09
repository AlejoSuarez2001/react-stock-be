import Follow from "../models/Follow.model.js";
import Stock from "../models/Stock.model.js";
import User from "../models/User.model.js";

// Creo Follow
export const createFollow = async (req, res) => {
  const { user, symbol } = req.body;

  try {
    const existingUser = await User.findOne({ where: { user } });
    const existingStock = await Stock.findOne({ where: { symbol } });

    if (!existingUser || !existingStock) {
      return res.status(404).json({ message: "User or stock not found" });
    } else {
      const newFollow = await Follow.create({
        userId: existingUser.id,
        stockId: existingStock.id,
      });
      res.status(201).json(newFollow);
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Follow already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Elimino Follow
export const deleteFollow = async (req, res) => {
  const { user, symbol } = req.body;

  try {
    const existingUser = await User.findOne({ where: { user } });
    const existingStock = await Stock.findOne({ where: { symbol } });

    if (!existingUser || !existingStock) {
      return res.status(404).json({ message: "User or stock not found" });
    } else {
      const deletedFollow = await Follow.destroy({
        where: {
          userId: existingUser.id,
          stockId: existingStock.id,
        },
      });

      if (deletedFollow) {
        res.status(200).json({ message: "Follow deleted successfully" });
      } else {
        res.status(404).json({ message: "Follow not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
