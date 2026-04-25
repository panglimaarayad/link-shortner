const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  original: String,
  short: String
});

module.exports = mongoose.model("Link", LinkSchema);
