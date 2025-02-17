/*
Exercice 6 : Associer un serveur HTML et un serveur API JSON
💡 Objectif :

Un serveur HTML (port 3000) qui sert les fichiers statiques.
Un serveur API JSON (port 4000) qui lit un fichier database.json et renvoie ses données.
Un script JavaScript qui fetch les données de l'API et les affiche dans le HTML.

💡 Structure :

/mon-projet
│── /public
│   ├── index.html     (Page HTML principale)
│   ├── style.css      (Fichier CSS pour le style)
│   ├── script.js      (Script JS qui récupère les données du JSON via fetch)
│── /server
│   ├── server_html.js  (Serveur qui sert la page HTML)
│   ├── server_api.js   (Serveur API qui lit et envoie le fichier JSON)
│── /data
│   ├── database.json   (Fichier JSON servant de base de données)
│── package.json
│── README.md (Facultatif)


✅ Bonus :

Ajouter une page d'administration pour ajouter des utilisateurs dans le JSON
Gérer un formulaire HTML qui envoie des données à l’API (AJAX avec fetch)
Ajouter une route API pour modifier ou supprimer un utilisateur
Créer un fichier de logs (logs.txt) qui enregistre chaque requête
*/




//onst fs = require('fs');     // Module pour la gestion des fichiers

// Crée un serveur HTTP

const http = require('http'); // Le module http de Node.js

const url = require('url'); // Le module url pour analyser les requêtes

const PORT_JSON = 4000;
const ROUTE = '/data';

// Exemple de données
const data = [
    { id: 1, name: 'Article 1', description: "Description de l'article 1" },
    { id: 2, name: 'Article 2', description: "Description de l'article 2" }
];



// Créer le serveur
const server = http.createServer((req, res) => {

    // Analyser l'URL de la requête

    if (req.method === 'OPTIONS') {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.writeHead(200);
        res.end();
        return;

    }

    // Vérifier la méthode de la requête et l'URL
    if (req.method === 'GET' && req.url === ROUTE) {
        // Renvoie les articles
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else {
        // Si la route n'est pas reconnue
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route non trouvée' }));
    }
});

// Écouter sur le port 3000
server.listen(PORT_JSON, () => {
    console.log(`Serveur API en cours d\'exécution sur http://localhost:${PORT_JSON}`);
});