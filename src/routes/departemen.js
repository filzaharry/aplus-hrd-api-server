const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const departemenController = require("../controllers/departemen");

router.post("/departemen",departemenController.createDepartemen);
router.get("/departemen", departemenController.getAllDepartemen);
router.get("/departemen/:departemenId", departemenController.getDepartemenById);
router.put("/departemen/:departemenId", departemenController.updateDepartemen);
router.delete("/departemen/:departemenId",departemenController.deleteDepartemen);

module.exports = router;

// image remove path handler 
const removeImage = (filePath) => {
    console.log("filepath", filePath);
    console.log("dirname", __dirname);
    // C:\Users\JARVIS\Desktop\MERN\skripsi\api-server\images\image.jpg
    filePath = path.join(__dirname, "../..", filePath);
    // remove file by unlink
    fs.unlink(filePath, (err) => {
      console.log(err);
    });
  };