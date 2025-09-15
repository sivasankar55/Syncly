import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
     email: {
        type: String,
        required: true,
     },
     name: {
        type: String,
        required: true,
     },
     image: {
        type: String,
        required: true, 
     },
     clerkId: {
        type: String,
        required: true,
        unique: true,
     }
},{timestamps: true});

export default mongoose.model("User", userSchema);