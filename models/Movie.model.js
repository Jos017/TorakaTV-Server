const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Movie = model("List", movieSchema);
module.exports = List;
