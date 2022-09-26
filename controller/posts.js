import Post from "../models/postMessages.js"

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = (req, res) => {
    res.send('Post Creation logic')
}