const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

function isLoggedIn(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.send('You must be logged in first')
    try {
        let data = jwt.verify(token, "shhhhh")
        req.user = data
        next()
    } catch (err) {
        res.redirect('/login')
    }
}

app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts')
    res.render('profile', { user })
})


app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    let { content } = req.body
    let post = await postModel.create({
        user: user._id,
        content: content
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id })
    
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid)
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()
    res.redirect('/profile')
})

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user')
    res.render('edit', { post })
})

app.post('/update/:id', isLoggedIn, async (req, res) => {
    await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content })
    res.redirect('/profile')
})

app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body
    let user = await userModel.findOne({ email })
    if (user) return res.status(400).send('User already registered')

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({ username, name, email, age, password: hash })
            let token = jwt.sign({ email: email, userid: createdUser._id }, "shhhhh")
            res.cookie('token', token)
            res.redirect('/profile')
        })
    })
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return res.status(404).send('Something went wrong')

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhhh")
            res.cookie('token', token)
            res.redirect('/profile')
        } else {
            res.redirect('/login')
        }
    })
})

app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.redirect('/login')
})

app.listen(5500, () => console.log(`Server is running on http://localhost:5500`))