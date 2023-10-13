const { heure } = require("../js/heure");

async function handleGuildMemberAdd(member) {
  // Vérifiez si le membre a rejoint le serveur que vous voulez gérer
  if (member.id === "761486907430404098") {
    const roleIdToAssign = "1138780122888019968"; // Remplacez par l'ID du rôle

    try {
      const roleToAssign = await member.guild.roles.fetch(roleIdToAssign);

      if (roleToAssign) {
        // Attribuez le rôle au nouveau membre
        member.roles.add(roleToAssign);
        const formattedTime = heure();

        console.log(`[${formattedTime}] Rôle attribué à ${member.user.tag}`);
      }
    } catch (error) {
      const formattedTime = heure();

      console.error(
        `[${formattedTime}] Erreur lors de l'attribution du rôle : ${error}`
      );
    }
  }
}

module.exports = {
  handleGuildMemberAdd,
};
