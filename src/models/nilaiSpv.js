const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nilaiSpvSchema = new Schema(
  {
    hasilKerja: {
      type: Number,
      //   required: true,
    },
    keterampilan: {
      type: Number,
      // required: true
    },
    tanggungJawab: {
      type: Number,
      // required: true
    },
    kerjasama: {
      type: Number,
      // required: true
    },
    disiplin: {
      type: Number,
      // required: true
    },
    kerajinan: {
      type: Number,
      // required: true
    },
    ketelitian: {
      type: Number,
      // required: true
    },
    kejujuran: {
      type: Number,
      // required: true
    },
    loyalitas: {
      type: Number,
      // required: true
    },
    inisiatif: {
      type: Number,
      // required: true
    },
    rekomendasi: {
      type: Number,
      // required: true
    },
    question1: {
      type: String,
      // required: true
    },
    question2: {
      type: String,
      // required: true
    },
    question3: {
      type: String,
      // required: true
    },
    question4: {
      type: String,
      // required: true
    },
    question5: {
      type: String,
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

module.exports = mongoose.model("NilaiSpv", nilaiSpvSchema);
