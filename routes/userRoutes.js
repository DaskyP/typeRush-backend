const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); 
  },
});

const upload = multer({ storage });

router.put("/:id", upload.single("avatar"), async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.params.id;
  let avatarPath = req.file ? `/uploads/${req.file.filename}` : undefined; 

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (avatarPath) user.avatar = avatarPath; 

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: "Perfil actualizado correctamente",
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        avatar: user.avatar 
      },
      token,
    });
  } catch (error) {
    console.error("🔴 Error al actualizar perfil:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
