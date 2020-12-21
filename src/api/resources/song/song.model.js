import mongoose, { Mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Song must have title"],
  },
  url: {
    type: String,
    required: [true, "Song must have url"],
  },
  rating: {
    type: Number,
    default: 0,
    max: 5,
    min: 0,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

songSchema.plugin(mongoosePaginate);

export default mongoose.model("Song", songSchema);
