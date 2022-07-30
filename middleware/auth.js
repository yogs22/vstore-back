module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', `Mohon maaf sesi anda telah habis, silahkan login ulang`)
      req.flash('alertStatus', `danger`)
      res.redirect('/')
    } else {
      next()
    }
  }
}
