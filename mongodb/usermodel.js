
// mongoose.connect -> database create
// model create -> collection
// CREATE code -> document

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ghimirek290_db_user:lHZXLV3TXzR2eYC0@withdocker.7ei4bqc.mongodb.net/myDatabaseName?retryWrites=true&w=majority')


const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
})

 module.exports = mongoose.model("user", userSchema)

