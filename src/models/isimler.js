const { Schema, model } = require('mongoose')

const schema = Schema({
  userID: { type: String, default: 0 },
  guildID: { type: String, default: 0 },
  names: { type: Array, default: [] }
})
module.exports = model("isimler", schema)
