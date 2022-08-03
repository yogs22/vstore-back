const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Category = require('../category/model')

module.exports={
  index: async(req, res) => {
    try {
      const transaction = await Transaction.countDocuments()
      const voucher = await Voucher.countDocuments()
      const player = await Player.countDocuments()
      const category = await Category.countDocuments()
      res.render('admin/dashboard/view_dashboard', {
        session: req.session.user,
        title: 'Halaman Dashboard',
        count: {
          transaction,
          player,
          voucher,
          category,
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
