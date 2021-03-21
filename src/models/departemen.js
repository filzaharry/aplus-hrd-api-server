const mongoose = require("mongoose");
// schema untuk menentukan sebuah model
const { ObjectId } = mongoose.Schema;

const departemenSchema = new mongoose.Schema({
    image: {
      type: String,
      // required: true,
    },
    nama_dep: {
      type: String,
      default: "Belum diisi"
      // required: true,
    },
    supervisor: {
      type: String,
      // required: true,
    },
    kategori: {
      type: String,
      // required: true,
    },
    karyawanId: [{
        type: ObjectId,
        ref: "Karyawan",
    }],
    userId: [{
      type: ObjectId,
      ref: "User",
    }],
    
});

module.exports = mongoose.model("Departemen", departemenSchema);
