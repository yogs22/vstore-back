const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama game wajib diisi']
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  thumbnail: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  nominals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Voucher', categorySchema)
