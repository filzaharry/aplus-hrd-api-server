const express = require("express");
const router = express.Router();
const periodeController = require("../controllers/periode");

router.post("/karyawan/:karyawanId",periodeController.createPeriode);
router.get("/karyawan/:karyawanId/periode", periodeController.getAllPeriode);
router.get("/karyawan/:karyawanId/periode/:periodeId", periodeController.getPeriodeById);
router.put("/karyawan/:karyawanId/periode/:periodeId", periodeController.updatePeriode);
router.delete("/karyawan/:karyawanId/periode/:periodeId",periodeController.deletePeriode);

module.exports = router;