const { validationResult } = require("express-validator");
const periodeSchema = require("../models/periode");
const karyawanSchema = require("../models/karyawan");
const nilaiHrdSchema = require("../models/nilaiHrd");
const nilaiSpvSchema = require("../models/nilaiSpv");

exports.createPeriode = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = new Error("Input Periode tidak sesuai");
      err.errorStatus = 400;
      err.data = error.array();
      throw err;
    }

    const periode = req.body.periode;
    const tglMulai = req.body.tglMulai;
    const tglSelesai = req.body.tglSelesai;
    const nilaiHrdId = req.body.nilaiHrd
    const nilaiSpvId = req.body.nilaiSpv

    const nilaiHrd = await nilaiHrdSchema.findOne({ _id: nilaiHrdId });
    const nilaiSpv = await nilaiSpvSchema.findOne({ _id: nilaiSpvId });

    const totalNilai = 0;
    let status;
    if (totalNilai > 20) {
      status = "Diperpanjang";
    } else {
      status = "Tidak Diperpanjang";
    }


    const karyawan = await karyawanSchema.findOne({
      _id: req.params.karyawanId,
    });
    // console.log(karyawan);
    const PostPeriode = {
      periode,
      tglMulai,
      tglSelesai,
      nilaiHrdId,
      nilaiSpvId,
      totalNilai,
      status,
    };

    const periodeObject = new periodeSchema(PostPeriode);
    const periodeAwait = await periodeObject.save();
    // console.log(periodeAwait)
    karyawan.periodeId.push({ _id: periodeAwait._id });
    await karyawan.save();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllPeriode = (req, res, next) => {
  periodeSchema
    .find()
    .then((count) => {
      return periodeSchema.find()
      .populate({ path: 'nilaiSpvId', select: 'id hasilAkhir' })
      .populate({ path: 'nilaiHrdId', select: 'id hasilAkhir' });
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Menampilkan data periode",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPeriodeById = (req, res, next) => {
  const periodeId = req.params.periodeId;
  periodeSchema
    .findById(periodeId)
    .populate({ path: 'nilaiSpvId', select: 'id hasilAkhir updatedAt' })
    .populate({ path: 'nilaiHrdId', select: 'id updatedAt masuk izin setengahHari sakit alpa hasilAkhir' })
    .then((result) => {
      if (!result) {
        const error = new Error("Periode tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Berhasil Menampilkan data periode melalui ID",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePeriode = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Update data Periode tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  const tglMulai = req.body.tglMulai;
  const tglSelesai = req.body.tglSelesai;
  const nilaiHrd = req.body.nilaiHrd
  const nilaiSpv = req.body.nilaiSpv
  const totalNilai = req.body.totalNilai;
  const status = req.body.status;
  const periodeId = req.params.periodeId;

  periodeSchema
    .findById(periodeId)
    .then((periode) => {
      if (!periode) {
        const err = new Error("periode tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      periode.periode = periode;
      periode.tglMulai = tglMulai;
      periode.tglSelesai = tglSelesai;
      periode.nilaiSpv = nilaiSpv;
      periode.nilaiHrd = nilaiHrd;
      periode.totalNilai = totalNilai;
      periode.status = status;

      return periode.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data nilai sukses !!!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePeriode = (req, res, next) => {
  const periodeId = req.params.periodeId;
  periodeSchema
    .findById(periodeId)
    .then((periode) => {
      if (!periode) {
        const error = new Error("periode tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      return periodeSchema.findByIdAndRemove(periodeId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus data periode berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
