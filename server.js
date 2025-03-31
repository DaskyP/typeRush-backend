const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes"); 
const wordRoutes = require("./routes/words");
const githubAuthRoutes = require("./routes/githubAuth"); 
const discordAuthRoutes = require("./routes/discordAuth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("Error al conectar MongoDB:", err));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/words", wordRoutes);
app.use("/auth/github", githubAuthRoutes);
app.use("/auth/discord", discordAuthRoutes);


const PORT = process.env.PORT || 5000;

let server;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = { app, server: process.env.NODE_ENV !== "test" ? server : null };

