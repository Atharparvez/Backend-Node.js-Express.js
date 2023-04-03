const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const cors = require('cors')

//require database models
const User = require('./model/users.js')
const AddPost = require('./model/posts')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())// cors origin resuorce sharing frontend(react) to to backend (node/express.js)

const dbURL = "mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(() => {
    console.log("Connected to database");
})

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {
        if (userData) {
            if (req.body.password === userData.password) {
                res.send({ message: "login successfull" })
            } else {
                res.send({ message: "Login failed" })
            }
        } else {
            res.send({ message: `No account seems to be matching with your Email` })
        }
    })
})

app.post('/signup', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {
        if (userData) {
            res.send({ message: "seemes like you have an account with this enterd email" })
        }
        else {
            const data = new User({
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password
            })
            data.save(() => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "User Registered Sucessfully" })
                }
            })
        }
    })
})

app.post('/add-post', async (req, res) => {
    let postData = new AddPost({
        author: req.body.author,
        Title: req.body.Title,
        summary: req.body.summary,
        image: req.body.image,
        location: req.body.location
    })
    try {
        await postData.save()
        res.send({ message: `Post Add Succeessfully` })
    } catch (err) {
        res.send({ message: `Failed to add Post` })
    }
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await AddPost.find()
        res.json(posts)
    } catch (err) {
        console.log(err);
    }
})

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const singlePost = await AddPost.findById(id)
        res.send(singlePost)
    } catch (error) {
        res.send(error)
    }
})


let PORT = 4000
app.listen(PORT, () => {
    console.log("listening to port 4000");
})
