const mongoose = require('mongoose');

var club = new mongoose.Schema({
    name: { type: String, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true }
});

var joueur = new mongoose.Schema({
    name: { type: String, required: true },
    classement: { type: String, required: true },
    age: { type: Number, required: true },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    championnat_equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Championnat_Equipe', required: true }
});

var championnat_equipe = new mongoose.Schema({
    name: { type: String, required: true },
    division: { type: String, required: true },
    saison: { type: String, required: true },
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }]
});

var tournois = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    lieu: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }],
    prize_money: { type: Number, required: true }
});

module.exports = {
    Club: mongoose.model('Club', club),
    Joueur: mongoose.model('Joueur', joueur),
    Championnat_Equipe: mongoose.model('Championnat_Equipe', championnat_equipe),
    Tournois: mongoose.model('Tournois', tournois)
};
