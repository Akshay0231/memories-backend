import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config()

import postRoute from './routes/posts.js'

// console.log('process env', process.env.USER_NAME, process.env.AUTH)
const app = express();
// app.use(express.json())



app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/posts', postRoute)

const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
).catch(
    (error) => console.log('Mongoose Error : ', error.message)
)

// mongoose.set('useFindAndModify', false)