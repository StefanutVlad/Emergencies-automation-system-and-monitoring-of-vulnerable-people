import mongoose from "mongoose";

//DB document structure
const Role = new mongoose.Schema({
  name: String
});

export default mongoose.model("Role", Role);
