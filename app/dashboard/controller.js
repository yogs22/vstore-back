module.exports={
  index: async(req, res) => {
    try {
      res.render('index', {
        session: req.session.user,
        title: 'Halaman Dashboard'
      })
    } catch (e) {
      console.log(e)
    }
  }
}
