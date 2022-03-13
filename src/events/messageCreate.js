const { MessageEmbed } = require('discord.js')
exports.execute = async message => {
if(!message.content.startsWith("!") || !message.guild || message.author.bot) return;
  const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if(!cmd) return;
  let embed = new MessageEmbed()
  .setFooter({ text: "discord.gg/serendia", iconURL: null})
.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
  .setColor(`GREEN`);
  cmd.run(client, message, args, embed);
}
module.exports.conf = {
  name:"messageCreate"
}
