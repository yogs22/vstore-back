const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email wajib diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama wajib diisi']
  },
  password: {
    type: String,
    require: [true, 'Password wajib diisi']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  phoneNumber: {
    type: String,
    require: [true, 'No handphone wajib diisi']
  },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
