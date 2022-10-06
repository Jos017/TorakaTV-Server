const { Schema, model } = require("mongoose");

const rankingSchema = new Schema(
  {
    rank: Number,
    tmdbId: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Ranking = model("Ranking", rankingSchema);
module.exports = Ranking;
