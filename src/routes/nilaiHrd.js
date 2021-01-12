const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiHrd");

router.post("/periode/:periodeId",nilaiController.createNilaiHrd);
router.get("/periode/:periodeId/nilaihrd", nilaiController.getAllNilaiHrd);
router.get("/nilaihrd/:nilaiHrdId", nilaiController.getNilaiHrdById);
router.put("/nilaihrd/:nilaiHrdId", nilaiController.updateNilaiHrd);
router.delete("/nilaihrd/:nilaiHrdId",nilaiController.deleteNilaiHrd);

module.exports = router;