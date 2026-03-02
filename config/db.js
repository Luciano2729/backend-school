const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecole"
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL:", err);
    return;
  }
  console.log("✅ MySQL connecté");
});

module.exports = db;