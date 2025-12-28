const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ghimirek290_db_user:lHZXLV3TXzR2eYC0@withdocker.7ei4bqc.mongodb.net/myDatabaseName?retryWrites=true&w=majority')

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
})

module.exports = mongoose.model('user', userSchema)