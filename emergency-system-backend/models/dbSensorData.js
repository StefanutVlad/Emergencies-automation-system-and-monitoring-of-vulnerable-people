import mongoose from "mongoose";

//DB document structure
const sensorsSchema = mongoose.Schema({
  //Name: String,
  BPM: String,
  Temperature: String,
  Latitude: String,
  Longitude: String,
  Fall: String,
});

export default mongoose.model("Datas", sensorsSchema);
