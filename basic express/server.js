const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use(function(req, res, next){
    console.log('middleware start')
    next()
})


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/profile', (req, res) => {
  res.send('Hello')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(3000)