const mysql      = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "db"
  });

connection.connect(function(err) {if (err) throw err; console.log("Connected!"); });

let sql = `SELECT * FROM fees`;
connection.query(sql, (error, results, fields) => {
if (error) {
    return console.error(error.message);
}
//console.log(results.RowDataPacket)
});

connection.end();

<% for (let result of results) { %>
    <%= result.id %>   
<% } %>    