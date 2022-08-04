const Player = require('../player/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async(req, res) => {
    try {
      const payload = req.body

      if (req.file) {
        let tmp_path = req.file.path
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length -1]
        let filename = req.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
          try {
            let player = new Player({...payload, avatar: filename})
            await player.save()

            delete player._doc.password

            res.status(201).json({data: player})
          } catch (e) {
            if (e && e.name === "ValidationError") {
              return res.status(422).json({
                message: e.message,
                fields: e.errors
              })
            }
            return res.status(422).json({
              message: e.message,
            })
            next(e)
          }
        })
      } else {
        let player = new Player(payload)
        await player.save()

        delete player._doc.password

        res.status(201).json({data: player})
      }
    } catch (e) {
      if (e && e.name === "ValidationError") {
        return res.status(422).json({
          message: e.message,
          fields: e.errors
        })
      }
      return res.status(422).json({
        message: e.message,
      })
      next(e)
    }
  },
  signin: async(req, res) => {
    const { email, password } = req.body

    Player.findOne({ email: email }).then((player) => {
      if (player) {
        const checkPassword = bcrypt.compareSync(password, player.password)
        if (checkPassword) {
          const token = jwt.sign({
            player: {
              id: player._id,
              username: player.username,
              email: player.email,
              email: player.email,
              phoneNumber: player.phoneNumber,
              avatar: player.avatar,
            }
          }, config.jwtKey)

          res.status(200).json({
            data: { token }
          })
        } else {
          res.status(403).json({
            message: `Password yang anda masukkan salah`
          })
        }
      } else {
        res.status(403).json({
          message: `Email yang anda masukkan belum terdaftar`
        })
      }
    }).catch((err) => {
      res.status(500).json({
        message: err.message || `Internal server error`
      })

      next()
    })
  }
}
