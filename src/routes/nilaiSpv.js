const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiSpv");

router.post("/periode/:periodeId",nilaiController.createNilaiSpv);
router.get("/periode/:periodeId/nilaispv", nilaiController.getAllNilaiSpv);
// berhubung udah dapet 2 id dalam 1 route jadi gw biarin aja periode dan periodeId nya
router.get("/periode/:periodeId/nilaispv/:nilaiSpvId", nilaiController.getNilaiSpvById);
router.put("/periode/:periodeId/nilaispv/:nilaiSpvId", nilaiController.updateNilaiSpv);
router.delete("/nilaispv/:nilaiSpvId",nilaiController.deleteNilaiSpv);

module.exports = router;