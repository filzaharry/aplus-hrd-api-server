const express = require("express");
const router = express.Router();
const jabatanController = require("../controllers/jabatan");

router.post("/jabatan",jabatanController.createJabatan);
router.get("/jabatan", jabatanController.getAllJabatan);
router.get("/jabatan/:jabatanId", jabatanController.getJabatanById);
router.put("/jabatan/:jabatanId", jabatanController.updateJabatan);
router.delete("/jabatan/:jabatanId",jabatanController.deleteJabatan);

module.exports = router;