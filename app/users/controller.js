module.exports = {
  viewSignin: async(req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }

      res.render('admin/users/view_signin', {
        alert
      })
    } catch (e) {
      req.flash('alertMessage', `${e.message}`)
      req.flash('alertStatus', `danger`)
      res.redirect('category')
    }
  },
}
