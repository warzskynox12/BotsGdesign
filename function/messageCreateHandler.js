const fs = require("fs");
const { heure } = require("../js/heure.js");

let punishments = {};
try {
  const data = fs.readFileSync("./json/punishments.json");
  punishments = JSON.parse(data);
} catch (error) {
  console.error(
    "Erreur lors du chargement du fichier punishments.json :",
    error
  );
}

async function handleIncomingMessage(message) {
  if (message.author.bot) {
    return;
  }
  const forbiddenUserIds = [
    "1042761953011060786",
    "1093555185265152080",
    "1093897244975059115",
  ];
  const isAdministrator = message.member.permissions.has("Administrator");

  const mentionedUsers = message.mentions.users;
  const repliedMessage = message.reference
    ? await message.channel.messages.fetch(message.reference.messageId)
    : null;

  if (!isAdministrator && mentionedUsers.size > 0) {
    const mentionedForbiddenUser = mentionedUsers.some((user) =>
      forbiddenUserIds.includes(user.id)
    );

    if (
      mentionedForbiddenUser &&
      (!repliedMessage || !forbiddenUserIds.includes(repliedMessage.author.id))
    ) {
      const userId = message.author.id;

      if (!punishments[userId]) {
        punishments[userId] = {
          infractions: 1,
          lastInfraction: Date.now(),
          name: message.author.id,
        };
        console.log(
          `[${heure()}]: ${
            message.author.id
          } a mentionné une personne interdite`
        );
      } else {
        punishments[userId].infractions += 1;
        punishments[userId].lastInfraction = Date.now();
        punishments[userId].name = message.author.id;
        const formattedTime = heure();

        console.log(
          `[${formattedTime}] ${message.author.id} a mentionné une personne interdite ${punishments[userId].infractions} fois`
        );
      }
      if (punishments[userId].infractions > 2) {
        const salonpunitionId = "1144244443034157167"; // Remplacez par l'ID réel du salon
        const salonpunition = message.guild.channels.cache.get(salonpunitionId);
        if (salonpunition) {
          const formattedTime = heure();

          salonpunition.send(
            `Le membre <@${message.author.id}> n'a pas respecté les règles ${punishments[userId].infractions} fois.`
          );
          console.log(
            `[${formattedTime}] Un message a été envoyé dans le canal de sanctions car l'utilisateur a enfreint les règles trop de fois`
          );
        }
      }

      fs.writeFileSync(
        "./json/punishments.json",
        JSON.stringify(punishments, null, 4)
      );

      const channel = message.channel;
      if (!repliedMessage) {
        message.delete().catch(console.error);
        await channel.send(
          `Vous n'avez pas le droit de mentionner cette personne, <@${message.author.id}>!`
        );
      }
    }
  }
}

module.exports = {
  handleIncomingMessage,
};
