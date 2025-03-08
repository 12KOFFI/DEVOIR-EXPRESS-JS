const express = require('express');
const path = require('path');
const app = express();

// Middleware pour vérifier les horaires
app.use((req, res, next) => {
    const now = new Date(); // Obtenir la date et l'heure actuelles
    const day = now.getDay(); // Obtenir le jour de la semaine (0-6)
    const hour = now.getHours(); // Obtenir l'heure actuelle (0-23)
    
    // Vérifier si le jour est entre lundi et dimanche et l'heure entre 9h et 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continuer vers la prochaine middleware ou route
    } else {
        // Envoyer une réponse 503 Service Unavailable avec un message HTML
        res.status(503).send(`
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px;
                    background: #f8f9fa;
                }
                h1 { color: #dc3545; }
            </style>
            <h1>Hors service</h1>
            <p>Nous sommes disponibles du lundi au vendredi, de 9h à 17h voire l'admin isaac-stone</p>
        `);
    }
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public'))); // Définir le dossier des fichiers statiques

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/acceuil.html')); // Route pour la page d'accueil
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/services.html')); // Route pour la page des services
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html')); // Route pour la page de contact
});

// Démarrer le serveur
const PORT = 3000; // Définir le port du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé : http://localhost:${PORT}`); // Message de confirmation du démarrage du serveur
});