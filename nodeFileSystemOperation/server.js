const fs = require('fs')

fs.writeFile("hey.txt", "hey how are you", function(err){
    if(err) console.error(err)
        else console.log("done")
})

fs.appendFile("hey.txt", "hey how are you good?", function(err){
    if(err) console.error(err)
        else console.log("done")
})

fs.rename("hey.txt", "helo.txt", function(err){
    if(err) console.error
    
    else console.log("done")
})


fs.copyFile("helo.txt", "./copy/hi.txt", function(err){
    if(err) console.error(err)
        else console.log("done")
})


fs.unlink("helo.txt", function(err){
    if(err) console.error(err)
        else console.log("removed")
})



//delete file and folder

fs.rm("./copy", {recursive: true}, function(err){
    if(err) console.error(err)
        else console.log("removed")
})


// create server

const http = require('http')

const server = http.createServer(function(req, res){
    res.end("hello world")
})

server.listen(3000)