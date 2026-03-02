const express = require("express");
const router = express.Router();
const controller = require("../controllers/etudiantController");

router.post("/", controller.createEtudiant);
router.get("/", controller.getEtudiants);
router.put("/:id", controller.updateEtudiant);
router.delete("/:id", controller.deleteEtudiant);
router.get("/stats/all", controller.getStats);

module.exports = router;