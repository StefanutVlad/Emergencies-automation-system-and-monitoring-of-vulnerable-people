import mongoose from "mongoose";

//DB document structure
const dataSchema = mongoose.Schema({
  Name: String,
  BPM: String,
  Temperature: String,
  Latitude: String,
  Longitude: String,
  Fall: String,
});

export default mongoose.model("users", dataSchema);
