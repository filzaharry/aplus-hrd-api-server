const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const periodeSchema = new mongoose.Schema(
  {
    periodeKe: {
      type: String,
      // required: true,
      unique: false
    },
    tglMulai: {
      type: Date,
      // required: true
    },
    tglSelesai: {
      type: Date,
      // required: true
    },
    nilaiHrdId: [
      {
        type: ObjectId,
        ref: "NilaiHrd",
      },
    ],
    nilaiSpvId: [
      {
        type: ObjectId,
        ref: "NilaiSpv",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Periode", periodeSchema);
