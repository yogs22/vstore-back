const Player = require('./model')
const Voucher = require('../voucher/model')

module.exports = {
  landingPage: async(req, res) => {
    try {
      const voucher = await Voucher.find()
        .select('_id name status thumbnail')
        .populate('category')

      return res.status(200).json({ data: voucher })
    } catch (e) {
      return res.status(500).json({message: err.message || `Internal server error`})
    }
  },
  detailPage: async(req, res) => {
    try {
      const { id } = req.params
      const voucher = await Voucher.findOne({ _id: id })
        .populate('user', '_id name phoneNumber')
        .populate('category')
        .populate('nominals')

      if (!voucher) {
        return res.status(404).json({ message: 'Voucher not found' })
      }

      return res.status(200).json({ data: voucher })
    } catch (e) {
      return res.status(500).json({message: err.message || `Internal server error`})
    }
  },
}
