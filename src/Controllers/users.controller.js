import User from "../models/User.model.js";
import bcrypt from "bcrypt";

// Registro del Usuario
export const registerUser = async (req, res) => {
  const { user, name, password } = req.body;
  try {
    const newUser = await User.create({
      user,
      name,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ error: error.message });
  }
};

// Logueo del Usuario
export const loginUser = async (req, res) => {
  const { user, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { user } });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
