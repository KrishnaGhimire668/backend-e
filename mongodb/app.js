const express = require('express')
const app = express()
const userModel = require('./usermodel')

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/create', async (req, res) => {
  const createdUser = await userModel.create({
    name: 'killer',
    email: 'killer@gmail.com',
    username: 'killer'
  })

  res.send(createdUser)
})

app.get('/update', async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { username: 'killer' },
    { name: 'babukiller' }
  )

  res.send(updatedUser)
})
// read all user
app.get('/read', async ( req, res) => {
    let users = await userModel.find()
    res.send(users)
})
// use username in find for searching single user


app.get('/delete', async ( req, res) => {
    let users = await userModel.findOneAndDelete()
    res.send(users)
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
