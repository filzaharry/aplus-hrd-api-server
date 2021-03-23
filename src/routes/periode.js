const express = require("express");
const router = express.Router();
const periodeController = require("../controllers/periode");
const { runValidation, validationPeriode } = require("../validation");

router.post("/karyawan/:karyawanId", validationPeriode,runValidation, periodeController.createPeriode);
// router.post("/karyawan", validationKaryawan,runValidation,karyawanController.createKaryawan);
router.get("/periode", periodeController.getAllPeriode);
router.get("/periode/:periodeId", periodeController.getPeriodeById);
router.put("/periode/:periodeId", periodeController.updatePeriode);
router.delete("/periode/:periodeId",periodeController.deletePeriode);

module.exports = router;