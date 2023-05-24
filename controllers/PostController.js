import UserModel from "../model/User.model.js";
import PostModel from "../model/Post.model.js";

export async function createPost(req, res) {
  try {
    const { title, description, image, user, category } = req.body;

    //validation
    if (!title || !description || !image || !user || !category) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await UserModel.findById(user);
    if (!exisitingUser) {
        return res.status(404).send({
            success: false,
            message: "unable to find user",
        });
    }
    const newPost = new PostModel({ title, description, image, user, category });
    // console.log(newBlog)
    
    await newPost.save();
    return res.status(201).send({
        success: true,
        message: "Post Created!",
        newPost,
    });
    // console.log("Working"),
  } catch(error) {
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
}

export async function getAllPost(req, res) {
    try{
        const posts = await PostModel.find({}).populate("user");
        if (!posts) {
            return res.status(200).send({
              success: false,
              message: "No Posts Found",
            });
          }
          return res.status(200).send({
            success: true,
            PostCount: posts.length,
            message: "All Post lists",
            posts,
          });
    }catch(error){
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Posts",
      error,
    });
    }
}

export async function updatePost(req,res) {
    try{
        const {id} = req.params;
        const { title, description, image, category } = req.body;

        const post = await PostModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true}
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            post,
          });

    }catch(error){
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error While Updating Post",
          error,
        }); 
    }
}

export async function deletePost(req,res) {
    try{
        const post = await PostModel.findByIdAndDelete(req.params.id).populate("user");

        await post.user.posts.pull(post);
        await post.user.save();
        return res.status(200).send({
            success: true,
            message: "Post Deleted!",
          });
    }catch(error){
        console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr While Deleteing Post",
      error,
    });
    }
}

export async function getPostById(req,res) {
    try{
        const { id } = req.params;
        const post = await PostModel.findById(id);
        
        if (!post) {
        return res.status(404).send({
        success: false,
        message: "Post not found with this ID",
        });
        }
        
      return res.status(200).send({
      success: true,
      message: "Fetch single post",
      post,
    });
    }catch(error){
        console.log(error);
    
    return res.status(400).send({
      success: false,
      message: "Error while getting single post",
      error,
    });
    }
}

export async function userPost(req,res) {
    try{
        const userPost = await UserModel.findById(req.params.id).populate("posts");

        if(!userPost) {
            return res.status(404).send({
                success: false,
                message: "posts not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user posts",
            userPost,
          });
    }catch(error){
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
    }
}