var mysql = require("mysql2")

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "score"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connexion database ok...")
})

module.exports = connection;