const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

let nodeProcess = null;

app.use(express.static('public'));

app.post('/start', (req, res) => {
    if (!nodeProcess) {
        nodeProcess = spawn('node', ['index.js'], {
            detached: true, // Détacher le processus enfant
            stdio: 'ignore', // Ignorer les entrées/sorties
        });
        res.status(200).send('Projet démarré');
    } else {
        res.status(400).send('Le projet est déjà en cours d\'exécution');
    }
});

app.post('/stop', (req, res) => {
    if (nodeProcess) {
        nodeProcess.kill('SIGINT'); // Tuer le processus enfant avec le signal SIGINT (pour une sortie propre)
        nodeProcess = null;
        res.status(200).send('Projet arrêté');
    } else {
        res.status(400).send('Le projet n\'est pas en cours d\'exécution');
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});