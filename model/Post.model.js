import mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user ID is required"]
  },  
  category: {
    type: String,
    require: [true, "Category is required"],
  },
  title: {
    type: String,
    require: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is require"],
  },
  image: {
    type: String,
  },
},
  {timestamps: true}
)

export default mongoose.model.Post || mongoose.model('Post', PostSchema)