const { check, validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg
    });
  }
  next();
};

exports.validationPeriode = [
  check("periodeKe", "Periode harus di isi").notEmpty()
  .isLength({min: 1}).withMessage('Wajib isi urutan periode')
  .isLength({max: 30}).withMessage('Periode sudah mencapai maksimal'),

];

exports.validationKaryawan = [
  check("name", "Nama Karyawan tidak boleh kosong").notEmpty()
  .isLength({min: 3}).withMessage('Nama Lengkap minimal 3 Karakter')
  .isLength({max: 30}).withMessage('Nama Lengkap maksimal 25 Karakter'),

  
  check("nik", "NIK Karyawan tidak boleh kosong").notEmpty()
  .isLength({min: 3}).withMessage('NIK harus 3 angka')
  .isLength({max: 3}).withMessage('NIK harus 3 angka'),

    
  check("tempatLahir", "Tempat Lahir tidak boleh kosong").notEmpty()
  .isLength({min: 4}).withMessage('Tempat Lahir minimal 3 Karakter')
  .isLength({max: 30}).withMessage('Tempat Lahir maksimal 25 Karakter'),
  
  check("tglLahir", "Tanggal Lahir harus di isi").notEmpty(),
  check("gender", "Jenis Kelamin harus di isi").notEmpty(),
  check("agama", "Agama harus di isi").notEmpty(),
  
  check("alamat", "Alamat tidak boleh kosong").notEmpty()
  .isLength({min: 10}).withMessage('Alamat minimal 10 Karakter')
  .isLength({max: 100}).withMessage('Alamat maksimal 100 Karakter'),

  check("porto", "Link Portofolio tidak boleh kosong").notEmpty()
  .isLength({min: 10}).withMessage('Link Portofolio minimal 10 Karakter')
  .isLength({max: 100}).withMessage('Link Portofolio maksimal 100 Karakter'),

  check("cv", "Link CV tidak boleh kosong").notEmpty()
  .isLength({min: 10}).withMessage('Link CV minimal 10 Karakter')
  .isLength({max: 100}).withMessage('Link CV maksimal 100 Karakter'),

];






exports.validationRegister = [
  check("namaLengkap", "Nama Lengkap tidak boleh kosong").notEmpty()
  .isLength({min: 3}).withMessage('Nama Lengkap minimal 3 Karakter')
  .isLength({max: 25}).withMessage('Nama Lengkap maksimal 25 Karakter'),

  check("username", "Username tidak boleh kosong").notEmpty()
  .isLength({min: 6}).withMessage('Username minimal 6 Karakter')
  .isLength({max: 25}).withMessage('Username maksimal 25 Karakter'),

  check("email", "Email tidak boleh kosong").notEmpty().matches(/.+\@.+\..+/).withMessage('Email harus bertanda @contoh.com')
  .isLength({min: 10}).withMessage('Email minimal 10 Karakter')
  .isLength({max: 25}).withMessage('Email maksimal 25 Karakter'),

  check("password", "Password tidak boleh kosong").notEmpty()
  .isLength({min: 6}).withMessage('Password minimal 6 Karakter')
  .isLength({max: 25}).withMessage('Password maksimal 25 Karakter')
];

exports.validationLogin = [
  check("username", "username tidak boleh kosong").notEmpty(),
  check("password", "password tidak boleh kosong").notEmpty(),
];
