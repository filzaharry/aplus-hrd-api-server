const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jabatanSchema = new mongoose.Schema(
  {
    nama_jab: {
      type: String,
      // required: true,
    },
    upahPerHari: {
      type: String,
    },
    upahRataPerBulan: {
      type: String,
    },
    karyawanId: [{
        type: ObjectId,
        ref: "Karyawan",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jabatan", jabatanSchema);
