// This sets up the server
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_tracker"
    }
)

module.exports = db;