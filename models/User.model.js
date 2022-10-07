const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    about: String,
    avatar: String,
    ranking: [{ type: Schema.Types.ObjectId, ref: "Ranking" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    list: [{ type: Schema.Types.ObjectId, ref: "ListItem" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
