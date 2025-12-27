const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Home route – read files and send to EJS
app.get('/', (req, res) => {
  fs.readdir('./files', (err, files) => {
    if (err) files = []
    res.render('index', { tasks: files })
  })
})

app.post('/create', (req, res) => {
  const { title, details } = req.body

  if (!title) return res.redirect('/')

  fs.writeFile(
    `./files/${title}.txt`,
    details || '',
    () => res.redirect('/')
  )
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})
