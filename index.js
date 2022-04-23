const { MessageEmbed, Collection, Client } = require('discord.js')
const client = global.client = new Client({ intents: 32767 })
const fs = require('fs')
const conf = client.conf = require('./configuration.json')
require('./src/client/handlers/connector.js')
require('./src/client/handlers/functions.js')



client.login(client.conf.Bot.token).then(() => console.log(`Bot aktif --- ${client.user.tag}`)).catch(err => console.log("Bot giriş yapamıyor: "+ err))

client.commands = new Collection();
client.aliases = new Collection();



fs.readdir("./src/client/cmds", async(err, files) => {
  if(err) console.log(err)
  files.forEach(f => {
    const props = require(`./src/client/cmds/${f}`)
if(!props.cfg) return
    client.commands.set(props.cfg.cmd, props)
    console.log(`Komut yüklendi: ${props.cfg.cmd}`)
    props.cfg.aliases.forEach(x => {
      client.aliases.set(x, props.cfg.cmd)
    })
  })
})


fs.readdirSync("./src/events", { encoding: "utf-8" })
    .filter(filee => filee.endsWith(".js"))
    .forEach(doc => {
      const f = require(`./src/events/${doc}`);
      if (!f.conf.name) return;
        console.log(`Event yüklendi: ${f.conf.name}`)
      client.on(f.conf.name, f.execute);
    });  
