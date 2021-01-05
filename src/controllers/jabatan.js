const { validationResult } = require("express-validator");
const jabatanSchema = require("../models/jabatan");

exports.createJabatan = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Input jabatan tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  const nama_jab = req.body.nama_jab;
  const upahPerHari = req.body.upahPerHari;
  const upahRataPerBulan = req.body.upahRataPerBulan;

  const PostJabatan = new jabatanSchema({
    nama_jab,
    upahPerHari,
    upahRataPerBulan,
  });

  PostJabatan.save()
    .then((result) => {
      res.status(201).json({
        message: "Berhasil Tambah Jabatan",
        data: result,
      });
    })
    .catch((err) => {
      console.log("error di Jabatan boss :", err);
    });
};

exports.getAllJabatan = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 20;
  let totalItems;

  jabatanSchema
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return jabatanSchema
        .find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Menampilkan data Jabatan",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: currentPage,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getJabatanById = (req, res, next) => {
  const jabatanId = req.params.jabatanId;
  jabatanSchema
    .findById(jabatanId)
    .then((result) => {
      if (!result) {
        const error = new Error("Jabatan tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Berhasil Menampilkan data Jabatan melalui ID",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateJabatan = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Update data Jabatan tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const nama_jab = req.body.nama_jab;
  const upahPerHari = req.body.upahPerHari;
  const upahRataPerBulan = req.body.upahRataPerBulan;

  jabatanSchema
    .findById(jabatanId)
    .then((jabatan) => {
      if (!jabatan) {
        const err = new Error("Jabatan tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      jabatan.nama_jab = nama_jab;
      jabatan.upahPerHari = upahPerHari;
      jabatan.upahRataPerBulan = upahRataPerBulan;

      return jabatan.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data jabatan sukses !!!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteJabatan = (req, res, next) => {
  const jabatanId = req.params.jabatanId;
  jabatanSchema
    .findById(jabatanId)
    .then((jabatan) => {
      if (!jabatan) {
        const error = new Error("Jabatan tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      return jabatanSchema.findByIdAndRemove(jabatanId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus data jabatan berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
