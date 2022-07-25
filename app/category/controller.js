const Category = require('./model')

module.exports = {
  index: async(req, res) => {
    try {
      res.render('admin/category/view_category')
    } catch (e) {
      console.log(e)
    }
  },
  viewCreate: async(req, res) => {
    try {
      res.render('admin/category/create')
    } catch (e) {
      console.log(e)
    }
  },

  actionCreate: async(req, res) => {
    try {
      const { name } = req.body

      let category = await Category({ name })
      await category.save();

      res.redirect('/category')
    } catch (e) {
      console.log(e)
    }
  }
}
