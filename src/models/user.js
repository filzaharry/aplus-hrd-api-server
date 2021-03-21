const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    namaLengkap: {
      type: String,
      //   required: true,
    },
    departemenId: {
      type: ObjectId,
      ref: "Departemen",
      default: 'Belum di isi'
      // required: true,
    },
    jabatanId: {
      type: ObjectId,
      ref: "Jabatan",
      default: 'Belum di isi'
      // required: true, 
    },
    username: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      // required: true
    },
    password: {
      type: String,
      // required: true
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
