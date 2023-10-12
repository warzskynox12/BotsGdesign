function heure() {
  const maintenant = new Date();
  const annee = maintenant.getFullYear();
  const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
  const jour = String(maintenant.getDate()).padStart(2, "0");
  const heure = maintenant.getHours();
  const minutes = String(maintenant.getMinutes()).padStart(2, "0");
  const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  return formattedTime;
}

module.exports = { heure };
