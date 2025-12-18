const mongoose = require('mongoose');
const { Joueur, Club, Championnat_Equipe } = require('../models/model');

exports.getAll = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Base de données non connectée' });
    }
    
    console.log('Tentative de récupération des joueurs...');
    const joueurs = await Joueur.find()
      .populate({
        path: 'club',
        select: 'name adress phone email website'
      })
      .populate({
        path: 'championnat_equipe',
        select: 'name division saison'
      });
    console.log(`Nombre de joueurs trouvés: ${joueurs.length}`);
    res.status(200).json(joueurs);
  } catch (error) {
    console.error('Erreur dans getAll joueurs:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const joueur = await Joueur.findById(req.params.id)
      .populate('club')
      .populate('championnat_equipe')
      .lean();
    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    res.status(200).json(joueur);
  } catch (error) {
    console.error('Erreur dans getById joueur:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const joueur = new Joueur(req.body);
    const savedJoueur = await joueur.save();
    const populatedJoueur = await Joueur.findById(savedJoueur._id).populate('club').populate('championnat_equipe');
    res.status(201).json(populatedJoueur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const joueur = await Joueur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('club').populate('championnat_equipe');
    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    res.status(200).json(joueur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const joueur = await Joueur.findByIdAndDelete(req.params.id);
    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    res.status(200).json({ message: 'Joueur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

