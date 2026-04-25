const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// konek database
mongoose.connect("mongodb://127.0.0.1:27017/xyzlink");

// schema
const Link = mongoose.model("Link", {
  original: String,
  short: String
});

// buat link baru
app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.json({ error: "URL kosong" });

  const shortCode = nanoid(6);

  const newLink = new Link({
    original: url,
    short: shortCode
  });

  await newLink.save();

  res.json({
    shortUrl: `http://localhost:3000/${shortCode}`
  });
});

// redirect
app.get("/:code", async (req, res) => {
  const code = req.params.code;

  const link = await Link.findOne({ short: code });

  if (!link) return res.send("Link tidak ditemukan");

  res.redirect(link.original);
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
