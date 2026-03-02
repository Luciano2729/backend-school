require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const etudiantRoutes = require("./routes/etudiantRoutes");

app.use("/api/etudiants", etudiantRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API School Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});