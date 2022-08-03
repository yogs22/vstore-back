const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email wajib diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama wajib diisi']
  },
  name: {
    type: String,
    require: [true, 'Username wajib diisi']
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
  avatar: {
    type: String,
  },
  fileName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    require: [true, 'No handphone wajib diisi']
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
}, { timestamps: true })

module.exports = mongoose.model('Player', categorySchema)
