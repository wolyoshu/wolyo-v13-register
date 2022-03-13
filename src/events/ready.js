exports.execute = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: "discord.gg/serendia" }, status: "online" });
}
module.exports.conf = {
  name:"ready"
}
