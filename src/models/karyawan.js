const mongoose = require("mongoose");
// schema untuk menentukan sebuah model
const { ObjectId } = mongoose.Schema;

const karyawanSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true, // required = wajib
    },
    name: {
      type: String,
      // required: true, 
    },
    nik: {
      type: String,
      // required: true, 
    },
    departemenId: {
      type: ObjectId,
      ref: "Departemen"
      // required: true,
    },
    jabatanId: {
      type: ObjectId,
      ref: "Jabatan"
      // required: true, 
    },
    tglMulai: {
      type: Date,
      default: Date.now
      // required: true, 
    },
    tempatLahir: {
      type: String,
      // required: true, 
    },
    tglLahir: {
      type: Date,
      // required: true, 
    },
    gender: {
      type: String,
      enum : ['Pria','Wanita'],
      // required: true, 
    },
    agama: {
      type: String,
      // required: true, 
    },
    alamat: {
      type: String,
      // required: true, 
    },
    porto: {
      type: String,
      // required: true, 
    },
    cv: {
      type: String,
      // required: true, 
    },
    periodeId: [{
        type: ObjectId,
        ref: "Periode",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Karyawan", karyawanSchema);
