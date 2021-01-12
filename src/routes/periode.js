const express = require("express");
const router = express.Router();
const periodeController = require("../controllers/periode");

router.post("/karyawan/:karyawanId",periodeController.createPeriode);
router.get("/periode", periodeController.getAllPeriode);
router.get("/periode/:periodeId", periodeController.getPeriodeById);
router.put("/periode/:periodeId", periodeController.updatePeriode);
router.delete("/periode/:periodeId",periodeController.deletePeriode);

module.exports = router;