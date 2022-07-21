module.exports={
  index: async(req, res) => {
    try {
      res.render('index', {
        title: 'Express JS vstore'
      })
    } catch (e) {
      console.log(e)
    }
  }
}
