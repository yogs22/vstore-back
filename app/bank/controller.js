const Bank = require('./model')

module.exports = {
  index: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      const bank = await Bank.find()
      res.render('admin/bank/view_bank', {
        bank,
        alert,
        session: req.session.user,
        title: 'Halaman Bank'
      })
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  },
  viewCreate: async(req, res) => {
    try {
      res.render('admin/bank/create', {
        session: req.session.user,
        title: 'Halaman Tambah Bank'
      })
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  },
  actionCreate: async(req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body

      let bank = await Bank({ name, nameBank, noRekening })
      await bank.save();

      req.flash('alertMessage', 'Berhasil tambah bank')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  },
  viewEdit: async(req, res) => {
    try {
      const { id } = req.params
      const bank = await Bank.findOne({_id: id})

      res.render('admin/bank/edit', {
        bank,
        session: req.session.user,
        title: 'Halaman Edit Bank'
      })
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  },
  actionEdit: async(req, res) => {
    try {
      const { id } = req.params
      const { name, nameBank, noRekening } = req.body

      const bank = await Bank.findOneAndUpdate({
        _id: id
      }, { name, nameBank, noRekening })

      req.flash('alertMessage', 'Berhasil edit bank')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  },
  actionDelete: async(req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOneAndRemove({
        _id: id
      })

      req.flash('alertMessage', 'Berhasil hapus bank')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('bank')
    }
  }
}
