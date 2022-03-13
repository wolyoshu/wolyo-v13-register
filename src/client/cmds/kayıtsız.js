exports.run = async (client, message, args, embed) => {
  if(!message.member.roles.cache.has(client.conf.Register.registerian)) return message.channel.send({ embeds:[embed.setDescription(`Bunun için yeterli yetkin bulunmamakta.`)]})
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send({ embeds:[ embed.setDescription(`Bir üye belirtmelisin.`)]})
  if(member.id == member.id) return message.channel.send({ embeds:[embed.setDescription(`Kendine işlem yapamazsın.`)]})
  if(member.user.bot) return message.channel.send({ embeds:[embed.setDescription(`Botlara işlem yapamazsın.`)]})
  if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds:[ embed.setDescription(`Bu üye senden üst veya aynı pozisyonda.`)]})
  member.roles.set(client.conf.Register.kayitsiz)
  message.channel.send({ embeds:[ embed.setDescription(`${member} üyesi kayıtsıza gönderildi.`)]})
  
}
module.exports.cfg = {
  cmd:"kayıtsız",
  aliases:[]
}
