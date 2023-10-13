function handleGuildMemberAddEvent(member) {
  const salonBienvenueId = "1093238297494556734";
  const salonBienvenue = member.guild.channels.cache.get(salonBienvenueId);

  if (salonBienvenue) {
    const { heure } = require("../js/heure.js");
    const formattedTime = heure();

    salonBienvenue.send(
      `Bienvenue sur le serveur, <@${member.user.id}> ! N'hésitez pas à vous présenter. :smile: `
    );
    console.log(
      `[${formattedTime}] ${member.user.id} est arrivé sur le serveur`
    );
  }
}

module.exports = {
  handleGuildMemberAddEvent,
};
