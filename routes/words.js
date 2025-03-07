const express = require("express");
const router = express.Router();
const Word = require("../models/Word");

router.get("/", async (req, res) => {
  try {
    const { mode, punctuation, numbers, count } = req.query;
    
    let query = { mode };

    if (punctuation === "true" || numbers === "true") {
      query.$or = [];
      if (punctuation === "true") query.$or.push({ hasPunctuation: true });
      if (numbers === "true") query.$or.push({ hasNumbers: true });
    }

    const words = await Word.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) || 15 } }
    ]);

    if (words.length === 0) {
      return res.status(404).json({ message: "No se encontraron palabras para esta configuración." });
    }

    res.json(words);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener palabras", error });
  }
});

module.exports = router;
