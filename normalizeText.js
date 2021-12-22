let fs = require('fs')
let data = fs.readFileSync('input.txt').toString()

function tgtrimm(str){let ars = str.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,'').replace(/\n/, '').toLowerCase(); return ars;}


fs.writeFileSync('inputN.txt', tgtrimm(data))
