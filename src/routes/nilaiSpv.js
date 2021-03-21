const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiSpv");

router.post("/periode/:periodeId",nilaiController.createNilaiSpv);
router.get("/periode/:periodeId/nilaispv", nilaiController.getAllNilaiSpv);
router.get("/periode/:periodeId/nilaispv/:nilaiSpvId", nilaiController.getNilaiSpvById);
router.put("/periode/:periodeId/nilaispv/:nilaiSpvId", nilaiController.updateNilaiSpv);
router.delete("/nilaispv/:nilaiSpvId",nilaiController.deleteNilaiSpv);

module.exports = router;