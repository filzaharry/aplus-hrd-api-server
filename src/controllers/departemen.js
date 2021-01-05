const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const departemenSchema = require("../models/departemen");

exports.createDepartemen = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Input data departemen tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const image = req.file.path;
  const nama_dep = req.body.nama_dep;
  const supervisor = req.body.supervisor;
  const kategori = req.body.kategori;

  const PostDepartemen = new departemenSchema({
    image: image,
    nama_dep: nama_dep,
    supervisor: supervisor,
    kategori: kategori,
  });

  PostDepartemen.save()
    .then((result) => {
      res.status(201).json({
        message: "Berhasil Tambah Departemen",
        data: result,
      });
    })
    .catch((err) => {
      console.log("error boss :", err);
    });
};

exports.getAllDepartemen = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 20;
  let totalItems;

  departemenSchema
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return departemenSchema
        .find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Menampilkan data Departemen",
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

exports.getDepartemenById = (req, res, next) => {
  const departemenId = req.params.departemenId;
  departemenSchema
    .findById(departemenId)
    .populate({ path: "karyawanId", select: "id name nik tglMulai" })
    .then((result) => {
      if (!result) {
        const error = new Error("Departemen tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Berhasil Menampilkan data Departemen melalui ID",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateDepartemen = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Update data departemen tidak sesuai");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const image = req.file.path;
  const nama_dep = req.body.nama_dep;
  const supervisor = req.body.supervisor;
  const kategori = req.body.kategori;
  // update from departemenId
  const departemenId = req.params.departemenId;

  departemenSchema
    .findById(departemenId)
    .then((departemen) => {
      if (!departemen) {
        const err = new Error("Departemen tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      departemen.image = image;
      departemen.nama_dep = nama_dep;
      departemen.supervisor = supervisor;
      departemen.kategori = kategori;

      return departemen.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data departemen sukses !!!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteDepartemen = (req, res, next) => {
  const departemenId = req.params.departemenId;
  departemenSchema
    .findById(departemenId)
    .then((departemen) => {
      if (!departemen) {
        const error = new Error("Departemen tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(departemen.image);
      return departemenSchema.findByIdAndRemove(departemenId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus data departemen berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// image remove path handler
const removeImage = (filePath) => {
  console.log("filepath", filePath);
  console.log("dirname", __dirname);
  // C:\Users\JARVIS\Desktop\MERN\skripsi\api-server\images\image.jpg
  filePath = path.join(__dirname, "../..", filePath);
  // remove file by unlink
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
