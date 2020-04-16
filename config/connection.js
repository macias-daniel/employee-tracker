const mysql = require("mysql");

//Creating connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTracker_db",
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
      console.error("error connecting:", err);
      return;
    }
});

module.exports = connection;