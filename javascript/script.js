var arr = [1, 2, 3, 4]
arr.forEach(function (val) {
    console.log(val + " hello")
})

var newarr = arr.map(function (val) {
    return val * 3
})
console.log(newarr)

var ans = arr.filter(function (val) {
    if (val >= 2) { return true }
    else return false
})

console.log(ans)

var ans = arr.find(function (val) {
    if (val === 2) return val
})
console.log(ans)


// console.log(arr.indexOf(0))

// objets
var obj = {
    name: "bdr",
    age: 15
}

Object.freeze(obj.age)
obj.age = 25
console.log(obj.name)
console.log(obj.age)


// return

function abcd(){
    return "hello world"
}
var ans = abcd()
console.log(ans)



