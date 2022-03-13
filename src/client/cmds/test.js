exports.run = async (client, message, args, embed) => {
let owner = ["810161653756198933"];
  if(!owner.includes(message.author.id)) return
  message.channel.send({ embeds:[embed.setDescription(`Bot aktif: ${client.user.tag}`)]})
}

exports.cfg = {
  cmd:"test",
  aliases:[]
}
