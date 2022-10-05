const { Schema, model } = require("mongoose");

const listItemSchema = new Schema(
  {
    title: String,
    tmdbId: Number,
    categories: [""],
    status: {
      type: String,
      enum: ["watching", "completed", "onHold", "dropped", "toWatch"],
      default: "watching",
    },
    progress: Number,
    totalProgress: Number,
    ranking: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ListItem = model("listItem", listItemSchema);
module.exports = ListItem;
