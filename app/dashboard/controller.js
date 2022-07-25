module.exports={
  index: async(req, res) => {
    try {
      res.render('index')
    } catch (e) {
      console.log(e)
    }
  }
}
