const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama kategori wajib diisi']
  }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)
