import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please enter valid Email Address"],
        unique: true,
    },
    profile: {type: String},
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
    ],
})

export default mongoose.model.Users || mongoose.model('User', UserSchema)