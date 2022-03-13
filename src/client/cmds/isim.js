const isimler = require('../../../src/models/isimler')
module.exports.run = async (client, message, args, embed) => {
if(!message.member.roles.cache.has(client.conf.Register.registerian)) return message.channel.send({ embeds: [embed.setDescription(`Bunun için yeterli yetkin bulunmamakta.`)]})
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.channel.send({ embeds:[ embed.setDescription(`Bir üye belirtmelisin.`)]}) 
if(message.member.roles.highest.position >= member.roles.highest.position) return message.channel.send({ embeds:[ embed.setDescription(`Bu üye senden üst veya aynı pozisyonda`)]})
  let name = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join("");
  if(!name) return message.channel.send({ embeds:[embed.setDescription(`Geçerli bir isim belirtmelisin.`)]}); 
let age = args.slice(2).filter(x => !isNaN(x))[0];
if(!age) return message.channel.send({ embeds:[embed.setDescription(`Geçerli bir yaş belirtmelisin.`)]})
  const Nick = `${member.user.username.includes(client.conf.Register.serverTag) ? client.conf.Register.serverTag : client.conf.Register.serverUntag} ${name} | ${age}`;
  await member.setNickname(Nick);
  await message.channel.send({ embeds:[ embed.setDescription(`${member} üyesinin ismi "${Nick}" olarak değiştirildi.`)]})
  await isimler.findOneAndUpdate({ userID: member.id, guildID: message.guild.id }, { $push: { names: { nick: Nick, sex:"İsim Değiştirme"} } }, { upsert: true })
}
module.exports.cfg = {
  cmd:"isim",
  aliases:["i"]
}
