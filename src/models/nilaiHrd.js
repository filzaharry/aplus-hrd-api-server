const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const nilaiHrdSchema = new mongoose.Schema(
  {
    masuk: {
      type: Number,
      //   required: true,
    },
    izin: {
      type: Number,
      //   required: true,
    },
    setengahHari: {
      type: Number,
      // required: true
    },
    sakit: {
      type: Number,
      // required: true
    },
    alpa: {
      type: Number,
      // required: true
    },
    hasilAkhir: {
      type: Number,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NilaiHrd", nilaiHrdSchema);
