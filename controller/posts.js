import mongoose from "mongoose"
import Post from "../models/postMessages.js"

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const post = req.body

        const newPost = new Post(post)

        await newPost.save();
        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const post = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post found for id ${id}`)

        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

        res.json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found for id ${id}`)

        await Post.findByIdAndDelete(id)

        res.json({ message: 'Post deleted successfully' })
    } catch (error) {

    }
}