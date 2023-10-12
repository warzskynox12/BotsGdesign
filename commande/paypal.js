module.exports = {
  data: {
    name: "paypal",
    description: "Payez avec PayPal",
  },
  async execute(interaction) {
    await interaction.reply({
      content: `Voici le PayPal : https://www.paypal.me/Gdesignofficial`,
    });
    const { heure } = require("../js/heure");
    console.log(
      `[${heure()}] la commande /paypal a etait utilisé par ${
        interaction.user.tag
      }`
    );
  },
};
