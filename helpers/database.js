const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'node-shop',
    passeword: 'pandemon'
})

module.exports = pool