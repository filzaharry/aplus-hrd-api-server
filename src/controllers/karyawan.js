// import express validator
const { validationResult } = require("express-validator");
const path = require("path");
// for delete file (image)
const fs = require("fs");
const karyawanSchema = require("../models/karyawan");
const departemenSchema = require("../models/departemen");
const jabatanSchema = require("../models/jabatan");
// const nilaiSchema = require("../models/nilai");

exports.createKaryawan = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = new Error("Input data karyawan tidak sesuai");
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
    const name = req.body.name;
    const tglMulai = req.body.tglMulai;
    const nik = req.body.nik;
    const tempatLahir = req.body.tempatLahir;
    const tglLahir = req.body.tglLahir;
    const gender = req.body.gender;
    const agama = req.body.agama;
    const alamat = req.body.alamat;
    const porto = req.body.porto;
    const cv = req.body.cv;
    const departemenId = req.body.departemen
    const jabatanId = req.body.jabatan

    const departemen = await departemenSchema.findOne({ _id: departemenId });
    const jabatan = await jabatanSchema.findOne({ _id: jabatanId });
  
    const PostKaryawan = {
      image: image,
      name: name,
      nik: nik,
      tglMulai: tglMulai,
      tempatLahir: tempatLahir,
      tglLahir: tglLahir,
      gender: gender,
      agama: agama,
      alamat: alamat,
      porto: porto,
      cv: cv,
      departemenId,
      jabatanId,
    };
    
    const karyawanObject = new karyawanSchema(PostKaryawan)
    const karyawan = await karyawanObject.save();
    // console.log(karyawan)
    departemen.karyawanId.push({ _id: karyawan._id })
    await departemen.save()
    jabatan.karyawanId.push({ _id: karyawan._id })
    await jabatan.save()
    
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.getAllKaryawan = (req, res, next) => {
  // const query untuk pagination
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 50;
  let totalItems;

  karyawanSchema
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return karyawanSchema
        .find()
        .populate({ path: 'departemenId', select: 'id nama_dep' })
        .populate({ path: 'jabatanId', select: 'id nama_jab' })
        .populate({ path: 'periodeId', select: 'id nama_jab' })
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Menampilkan data Karyawan",
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

exports.getKaryawanById = (req, res, next) => {

  const karyawanId = req.params.karyawanId;
  karyawanSchema.findById(karyawanId)
  .populate({ path: 'departemenId', select: 'id nama_dep' })
  .populate({ path: 'jabatanId', select: 'id nama_jab' })
    .then((result) => {
      if (!result) {
        const error = new Error("Karyawan tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Berhasil Menampilkan data Karyawan melalui ID",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateKaryawan = (req, res, next) => {
  // handle dynamic error validation with condition
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Update data karyawan tidak sesuai");
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
  const name = req.body.name;
  const nik = req.body.nik;
  const jabatan = req.body.jabatan;
  const departemen = req.body.departemen;
  const kontrak = req.body.kontrak;
  const tglMulai = req.body.tglMulai;
  const tglSelesai = req.body.tglSelesai;
  const tempatLahir = req.body.tempatLahir;
  const tglLahir = req.body.tglLahir;
  const gender = req.body.gender;
  const agama = req.body.agama;
  const alamat = req.body.alamat;
  const porto = req.body.porto;
  const cv = req.body.cv;
  const nilai = req.body.nilai;
  // update from karyawanId
  const karyawanId = req.params.karyawanId;

  karyawanSchema
    .findById(karyawanId)
    .then((karyawan) => {
      if (!karyawan) {
        const err = new Error("Karyawan tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      karyawan.image = image;
      karyawan.name = name;
      karyawan.nik = nik;
      karyawan.jabatan = jabatan;
      karyawan.departemen = departemen;
      karyawan.kontrak = kontrak;
      karyawan.tglMulai = tglMulai;
      karyawan.tglSelesai = tglSelesai;
      karyawan.tempatLahir = tempatLahir;
      karyawan.tglLahir = tglLahir;
      karyawan.gender = gender;
      karyawan.agama = agama;
      karyawan.alamat = alamat;
      karyawan.porto = porto;
      karyawan.cv = cv;
      karyawan.nilai = nilai;

      return karyawan.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data karyawan sukses !!!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteKaryawan = (req, res, next) => {
  const karyawanId = req.params.karyawanId;
  karyawanSchema
    .findById(karyawanId)
    .then((karyawan) => {
      if (!karyawan) {
        const error = new Error("Karyawan tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(karyawan.image);
      return karyawanSchema.findByIdAndRemove(karyawanId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus data karyawan berhasil",
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
