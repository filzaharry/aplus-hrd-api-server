const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const periodeSchema = new mongoose.Schema(
  {
    periode: {
      type: String,
      // required: true,
    },
    tglMulai: {
      type: Date,
      // required: true
    },
    tglSelesai: {
      type: Date,
      // required: true
    },
    nilaiHrdId: [{
      type: ObjectId,
      ref: "NilaiHrd"
    }],
    nilaiSpvId: [{
      type: ObjectId,
      ref: "NilaiSpv"
    }],
    totalNilai: {
      type: Number,
      // required: true
    },
    status: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Periode", periodeSchema);
