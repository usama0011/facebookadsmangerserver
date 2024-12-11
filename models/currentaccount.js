import mongoose from "mongoose";

const { Schema } = mongoose;

const currentAccount = new Schema(
  {
    currentAccountname: {
      type: String,
    },
    mainAccountname: {
      type: String,
    },
    mainAccountImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CurrentAccount", currentAccount);
