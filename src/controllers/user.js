require("dotenv").config();
const userSchema    = require("../models/user");
const departemenSchema    = require("../models/departemen");
const jabatanSchema    = require("../models/jabatan");
const bcryptjs      = require("bcryptjs");
const jsonwebtoken  = require("jsonwebtoken");
const { sendEmail } = require('../helpers')

exports.registerUser = async (req, res, next) => {
  try {
  const { namaLengkap, username, email, password } = req.body;
  const departemenId = req.body.departemen
  const jabatanId = req.body.jabatan

  const departemen = await departemenSchema.findOne({ _id: departemenId });
  const jabatan = await jabatanSchema.findOne({ _id: jabatanId });

  let emailUser = await userSchema.findOne({ email: email });
  let usernameUser = await userSchema.findOne({ username: username });

  if (emailUser) {
    return res.status(404).json({
      status: false,
      message: "email sudah tersedia",
    });
  }
  if (usernameUser) {
    return res.status(404).json({
      status: false,
      message: "username sudah tersedia",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const PostUser = {
    namaLengkap: namaLengkap,
    username: username,
    departemenId,
    jabatanId,
    email: email,
    password: hashPassword,
  };

  const userObject = new userSchema(PostUser)
  const user = await userObject.save();
  // console.log(user)
  departemen.userId.push({ _id: user._id })
  await departemen.save()
  jabatan.userId.push({ _id: user._id })
  await jabatan.save()
  return res.status(200).json({
    message: "Silahkan Login Dengan Akun Anda",
  });
  
  }catch(err){
      console.log("error user bos :", err);
    };
};

exports.loginUser = async (req, res, next) => {
  // try {
  const { username, password } = req.body;

  const dataUser = await userSchema.findOne({
    $or: [
      { username: username }, 
      { email: username },
    ],
  });
  console.log(dataUser);
  if (dataUser) {
    // jika username ada, pengecekan password
    const passwordUser = await bcryptjs.compare(password, dataUser.password);
    if (passwordUser) {
      // jika password benar masuk ke sini
      const data = {
        id: dataUser._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Berhasil Login",
        token,
        dataUser
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "pasword tidak sesuai",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "username atau email tidak ditemukan",
    });
  }
};

exports.getSingleUser = async (req, res, next) => {
  
  // console.log(req.id);
  const user = req.id;
  userSchema
  .findById({ _id: user })
  .populate({ path: 'departemenId', select: 'id nama_dep' })
  .populate({ path: 'jabatanId', select: 'id nama_jab' })
  .then((result) => {
    return res.status(200).json({
      message: "berhasil dipanggil",
      data: result
    });
  })
  .catch((err) => {
    next(err);
  });
};



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userSchema.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'Email tidak tersedia',
    });
  }
  // console.log(user);

  const token = jsonwebtoken.sign({
    idUser: user._id
  }, process.env.JWT_SECRET)

  await user.updateOne({resetPasswordLink: token})

  const templateEmail = {
    from: '"Brave Dragon" <filza@gmail.com>',
    to: email,
    subject: 'Link Reset Password',
    html: `<img src="https://image.flaticon.com/icons/png/512/1458/1458511.png" width="200px"><p>Silahkan klik link di bawah ini untuk melakukan reset password Anda</p><p>${process.env.CLIENT_URL}/reset-password/${token}</p>`
  }
  sendEmail(templateEmail)
  return res.status(200).json({
    status: true,
    message: 'Link Reset Password Berhasil Terkirim'
  });
};


exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  // console.log('token', token);
  // console.log('password', password);

  const user = await userSchema.findOne({resetPasswordLink: token})
  if(user){
    const hashPassword = await bcryptjs.hash(password, 10)
    user.password = hashPassword
    await user.save()
    return res.status(201).json({
      status: true,
      message: 'Password Berhasil di Ubah'
    })
  }
}