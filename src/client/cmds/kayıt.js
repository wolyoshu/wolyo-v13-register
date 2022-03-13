const { MessageButton, MessageActionRow } = require('discord.js');
const isimler = require('../../../src/models/isimler')
const cfg = require('../../../this')

module.exports.run = async (client, message, args, embed) => {
  if(!message.member.roles.cache.has(client.conf.Register.registerian)) return message.channel.send({ embeds:[ embed.setDescription(`Bunun için yeterli yetkin bulunmamakta.`)]});
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.channel.send({ embeds:[ embed.setDescription(`Bir üye belirtmelisin.`)]})
 let data = await isimler.findOne({ userID: member.id, guildID: message.guild.id });
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds:[ embed.setDescription(`Bu üye senden üst veya aynı pozisyonda.`)]})
  if(member.id == gay.id) return message.channel.send({ embeds: [embed.setDescription(`Kendine işlem yapamazsın.`)]})
  if(member.user.bot) return message.channel.send({ embeds:[ embed.setDescription(`Botlara işlem yapamazsın.`)]})
  const man = new MessageButton()
  .setCustomId("erkek")
  .setStyle("PRIMARY")
  .setDisabled(false)
  .setLabel("Erkek");
  const woman = new MessageButton()
  .setCustomId("kiz")
  .setStyle("DANGER")
  .setDisabled(false)
  .setLabel("Kadın");
  let row = new MessageActionRow()
  .addComponents(man)
  .addComponents(woman);
  let name = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
  if(!name) return message.channel.send({ embeds:[embed.setDescription(`Geçerli bir isim belirtmelisin.`)]}); 
let age = args.slice(2).filter(x => !isNaN(x))[0];
if(!age) return message.channel.send({ embeds:[embed.setDescription(`Geçerli bir yaş belirtmelisin.`)]})
  const Nick = `${member.user.username.includes(client.conf.Register.serverTag) ? client.conf.Register.serverTag : client.conf.Register.serverUntag} ${name} | ${age}`;
  await member.setNickname(Nick);
  await message.channel.send({ embeds:
    [embed.setDescription(`${member} üyesinin ismi "${Nick}" olarak değiştirildi.

Bu üyenin ${data.names.length || 0} isim kaydı bulundu:
${data ? data.names.map((x, i) => `\`${x + 1}.\` \`${i.nick}\` (${i.sex})`).join("\n") : "Kayıt geçmişi bulunmuyor."}
`)], components:[row]}).then(async(msg) => { 
 const filter = (interaction) => interaction.user.id == message.author.id; 
  let collector = msg.createMessageComponentCollector({filter,componentType:'BUTTON',max:3,time: 30000}) 
 collector.on("collect",async (button) => {
if(button.customId == "erkek") {
  if(!member.roles.cache.get(client.conf.Register.erkek)) return button.update({ embeds: [ embed.setDescription("Bu üye zaten kaydedilmiş.")], components:[]})
    await member.roles.add(client.conf.Register.erkek)
    await member.roles.remove(client.conf.Register.kayitsiz)
  await isimler.findOneAndUpdate({ userID: member.id, guildID: message.guild.id }, { $push: { names: { nick: Nick, sex: "Erkek" } } }, { upsert: true })
  button.update({ embeds:[ embed.setDescription(`${member} üyesi sunucumuza **erkek** olarak kaydedildi.`)], components: [] })
}

  if(button.customId == "kiz") {
      await isimler.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { $push: { names: { nick: Nick, sex: "Kız" } } }, { upsert: true })
if(member.roles.cache.has(client.conf.Register.kiz)) return button.update({ embeds: [ embed.setDescription("Bu üye zaten kaydedilmiş.")], components:[]})
    await member.roles.add(client.conf.Register.kiz)
    await member.roles.remove(client.conf.Register.kayitsiz)
  button.update({ embeds:[ embed.setDescription(`${member} üyesi sunucumuza **Kadın** olarak kaydedildi.`)], components: [] })
}
 })
  })
}

module.exports.cfg = {
  cmd:"kayıt",
  aliases:["kaydet"]
}
