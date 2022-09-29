const { Schema, model } = require("mongoose");

const serieSchema = new Schema(
  {
    title: String,
    rank: Number,
    cast: [{ type: Schema.Types.ObjectId, ref: "Actors" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Serie = model("List", serieSchema);
module.exports = List;
