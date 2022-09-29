const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    myRank: Number,
    description: String,
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);
module.exports = Review;
