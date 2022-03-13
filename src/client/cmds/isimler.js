const isimler = require('../../../src/models/isimler')
module.exports.run = async (client, message, args, embed) => {
  if(!message.member.roles.cache.has(client.conf.Register.registerian)) return message.channel.send({ embeds:[ embed.setDescription(`Bunun için yeterli yetkin bulunmamakta.`)]})
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds:[ embed.setDescription("Bu üye senden üst veya aynı pozisyonda.")]})
  if(!member) return message.channel.send({ embeds: [embed.setDescription("Bir üye belirtmelisin.")]})
  if(member.user.bot) return message.channel.send({ embeds:[ embed.setDescription(`Botlara işlem yapamazsın.`)]})
  let data = await isimler.findOne({ userID: member.id, guildID: message.guild.id })
  if(data) return message.channel.send({ embeds:[embed.setDescription(`${member} üyesinin isim geçmişi bulunmuyor.`)]})
  else {
    message.channel.send({ embeds:[
      embed.setDescription(`
${member} üyesinin ${data.names.length || 31} isim kaydı bulunuyor.

${data.names.map((x, i) => `\`${x+1}.\` \`${i.nick}\` (${i.sex})`).join("\n")}
`)
    ]})
  }
}
module.exports.cfg = {
  cmd:"isimler",
  aliases:["names"]
}
