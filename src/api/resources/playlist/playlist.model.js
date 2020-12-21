import mongoose, { Mongoose } from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Song must have title"],
  },

  songs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Playlist", playlistSchema);
