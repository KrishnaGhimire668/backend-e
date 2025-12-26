const express = require("express")
const app = express()


app.use(function(req, res, next){
    console.log('middleware chala')
    next()
})


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/profile', (req, res) => {
  res.send('Hello')
})

app.listen(3000)