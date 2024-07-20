const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    database : "mahasiswa",
    user : "root",
    password : ""
})

module.exports = db