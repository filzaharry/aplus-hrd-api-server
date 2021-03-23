const { validationResult } = require("express-validator");
const nilaiHrdSchema = require("../models/nilaiHrd");
const periodeSchema = require("../models/periode");

exports.createNilaiHrd = async (req, res, next) => {
  try {
    // handle dynamic error validation with condition
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = new Error("Input data nilaiHrd tidak sesuai");
      err.errorStatus = 400;
      err.data = error.array();
      throw err;
    }

    const masuk = req.body.masuk;
    const izin = req.body.izin;
    const setengahHari = req.body.setengahHari;
    const sakit = req.body.sakit
    const alpa = req.body.alpa

    const periode = await periodeSchema.findOne({ _id: req.params.periodeId });
    // console.log(periode)

    const hasilAkhir = (masuk - izin - setengahHari - sakit - alpa)*3.3;

    const PostNilaiHrd = {
      masuk: masuk,
      izin: izin,
      setengahHari: setengahHari,
      sakit: sakit,
      alpa: alpa,
      hasilAkhir: hasilAkhir,
    };

    const nilaiHrdObject = new nilaiHrdSchema(PostNilaiHrd);
    const nilaiHrd = await nilaiHrdObject.save();
    // console.log(nilaiHrd)
    periode.nilaiHrdId.push({ _id: nilaiHrd._id });
    await periode.save()
    .then(result => {
      res.status(201).json({
          message: 'Berhasil Tambah Nilai dari HRD',
          data: result
      })
  })


  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllNilaiHrd = (req, res, next) => {
  nilaiHrdSchema
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Menampilkan data NilaiHrd",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getNilaiHrdById = (req, res, next) => {
  const nilaiHrdId = req.params.nilaiHrdId;
  nilaiHrdSchema
    .findById(nilaiHrdId)
    .then((result) => {
      if (!result) {
        const error = new Error("nilaiHrd tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Berhasil Menampilkan data nilaiHrd melalui ID",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateNilaiHrd = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Update data nilaiHrd tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  const masuk = req.body.masuk;
  const izin = req.body.izin;
  const setengahHari = req.body.setengahHari;
  const sakit = req.body.sakit
  const alpa = req.body.alpa
  const hasilAkhir =
      (masuk -
        izin -
        setengahHari -
        sakit -
        alpa) /
      2;
  const nilaiHrdId = req.params.nilaiHrdId;

  nilaiHrdSchema
    .findById(nilaiHrdId)
    .then((nilaiHrd) => {
      if (!nilaiHrd) {
        const err = new Error("nilaiHrd tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      nilaiHrd.masuk = masuk;
      nilaiHrd.izin = izin;
      nilaiHrd.setengahHari = setengahHari;
      nilaiHrd.sakit = sakit;
      nilaiHrd.alpa = alpa;
      nilaiHrd.hasilAkhir = hasilAkhir;

      return nilaiHrd.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data nilaiHrd sukses !!!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteNilaiHrd = (req, res, next) => {
  const nilaiHrdId = req.params.nilaiHrdId;
  nilaiHrdSchema
    .findById(nilaiHrdId)
    .then((nilaiHrd) => {
      if (!nilaiHrd) {
        const error = new Error("nilaiHrd tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      return nilaiHrdSchema.findByIdAndRemove(nilaiHrdId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus data nilaiHrd berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
