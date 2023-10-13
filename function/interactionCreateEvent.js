async function handleInteractionCreateEvent(interaction, client) {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    const { heure } = require("../js/heure.js");
    const formattedTime = heure();
    console.log(
      `[${formattedTime}] Commande inconnue : ${interaction.commandName}`
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `Il y a eu une erreur lors de l'exécution de cette commande !`,
      ephemeral: true,
    });
  }
}

module.exports = {
  handleInteractionCreateEvent,
};
