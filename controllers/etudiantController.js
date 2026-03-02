const db = require("../config/db");

// ➕ Ajouter étudiant
exports.createEtudiant = (req, res) => {
  const { nom, note_math, note_phys } = req.body;

  if (!nom || note_math == null || note_phys == null) {
    return res.status(400).json({ message: "Champs requis" });
  }

  const sql = "INSERT INTO etudiant (nom, note_math, note_phys) VALUES (?, ?, ?)";
  db.query(sql, [nom, note_math, note_phys], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Étudiant ajouté", id: result.insertId });
  });
};

// 📋 Lister étudiants
exports.getEtudiants = (req, res) => {
  const sql = `
    SELECT *,
    ROUND((note_math + note_phys)/2,2) AS moyenne
    FROM etudiant
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ✏ Modifier
exports.updateEtudiant = (req, res) => {
  const { nom, note_math, note_phys } = req.body;
  const id = req.params.id;

  const sql = `
    UPDATE etudiant
    SET nom=?, note_math=?, note_phys=?
    WHERE numEt=?
  `;

  db.query(sql, [nom, note_math, note_phys, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Étudiant modifié" });
  });
};

// ❌ Supprimer
exports.deleteEtudiant = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM etudiant WHERE numEt=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Étudiant supprimé" });
  });
};

// 📊 Statistiques
exports.getStats = (req, res) => {
  const sql = `
    SELECT 
      ROUND(AVG((note_math+note_phys)/2),2) AS moyenne_classe,
      ROUND(MIN((note_math+note_phys)/2),2) AS moyenne_min,
      ROUND(MAX((note_math+note_phys)/2),2) AS moyenne_max,
      SUM(CASE WHEN (note_math+note_phys)/2 >= 10 THEN 1 ELSE 0 END) AS admis,
      SUM(CASE WHEN (note_math+note_phys)/2 < 10 THEN 1 ELSE 0 END) AS redoublants
    FROM etudiant
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};