const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email wajib diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama wajib diisi']
  },
  username: {
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

playerSchema.path('email').validate(async function(value){
  try {
    const count = await this.model('Player').countDocuments({ email: value })

    return !count;
  } catch (e) {
    throw e
  }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model('Player', playerSchema)
