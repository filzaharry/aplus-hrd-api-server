// import express
const express = require("express");

// import express-validator for validation request
const { body } = require("express-validator");

// make Router endpoint with express
const router = express.Router();

// import controller
const karyawanController = require("../controllers/karyawan");

// createKaryawan is a controller with validator
router.post("/karyawan", karyawanController.createKaryawan);

// getAllKaryawan is a controller
router.get("/karyawan", karyawanController.getAllKaryawan);
// query parameter = untuk pagination
// router.get("/karyawan?page=1&perPage=10", karyawanController.getAllKaryawan);
router.get("/karyawan/:karyawanId", karyawanController.getKaryawanById);

router.put("/karyawan/:karyawanId",karyawanController.updateKaryawan);

router.delete("/karyawan/:karyawanId", karyawanController.deleteKaryawan);

// export router
module.exports = router;
