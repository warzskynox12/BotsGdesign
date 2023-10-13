const { heure } = require("../js/heure.js");

async function handleReadyEvent(client, COMMANDS_DATA) {
  try {
    await client.application.commands.set(COMMANDS_DATA);
    const formattedTime = heure();
    console.log(
      `[${formattedTime}] Commandes globales enregistrées avec succès.`
    );
  } catch (error) {
    const formattedTime = heure();
    console.error(
      `[${formattedTime}] Erreur lors de l'enregistrement des commandes globales :`,
      error
    );
  }
}

module.exports = {
  handleReadyEvent,
};
