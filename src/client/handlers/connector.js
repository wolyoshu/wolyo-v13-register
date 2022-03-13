const mongoose = require('mongoose')

mongoose.connect(client.conf.Bot.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.connection.on("connect", async() => {
  console.log("Mongoose bağlandı.")
})

mongoose.connection.on("error", async err => {
  console.log("Mongoose bağlanamıyor: "+ err)
})
