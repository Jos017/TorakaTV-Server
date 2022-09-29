const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    series: [{ type: Schema.Types.ObjectId, ref: "Serie" }],
  },
  {
    timestamps: true,
  }
);

const List = model("List", listSchema);
module.exports = List;
