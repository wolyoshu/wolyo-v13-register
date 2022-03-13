const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

///// Serendia sitesinden aldım ewt
module.exports = {
  cfg: {
    cmd: "eval",
    aliases: []
  },
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {Array<String>} args
   * @param {MessageEmbed} embed
   */
  run: async (client,message,args,embed) => {
if(message.author.id !== "810161653756198933") return
    let code = args.join(" ");
    if(!code) return await message.reply({embeds: [embed.setDescription(`Bir kod girmelisin.`)]});
    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
   try {
      var evaled = clean(await eval(code)).replace(/[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,"-TOKEN-");
      if(evaled.length > 2000) {        
      let attach = new MessageAttachment(Buffer.from(`Çıktı çok uzun olduğu için dosya olarak atıyorum.\n\nGiriş: ${code}\nÇıkış: ${evaled.replace(/[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,"-TOKEN-")}`,'utf-8'),'eval.js');
        return await message.reply({files:[attach]});  
      } else {
        return await message.reply({embeds: [embed.setDescription(`**Giriş:** \`\`\`js\n${code}\`\`\`\n**Çıkış:** \`\`\`js\n${evaled.replace(/[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,"-TOKEN-")}\`\`\``)]});
      }
    } catch(err) {
      return await message.reply({embeds: [embed.setDescription(`**Hata:** \`\`\`js\n${err}\`\`\``).setColor("RED")]});
    }
  }
}; 
