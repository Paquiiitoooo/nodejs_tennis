const { Tournois, Joueur } = require('../models/model');

exports.getAll = async (req, res) => {
  try {
    const tournois = await Tournois.find().populate('participants');
    res.status(200).json(tournois);
  } catch (error) {
    console.error('Erreur dans getAll tournois:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tournoi = await Tournois.findById(req.params.id).populate('participants');
    if (!tournoi) {
      return res.status(404).json({ message: 'Tournoi non trouvé' });
    }
    res.status(200).json(tournoi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const tournoi = new Tournois(req.body);
    const savedTournoi = await tournoi.save();
    const populatedTournoi = await Tournois.findById(savedTournoi._id).populate('participants');
    res.status(201).json(populatedTournoi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const tournoi = await Tournois.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('participants');
    if (!tournoi) {
      return res.status(404).json({ message: 'Tournoi non trouvé' });
    }
    res.status(200).json(tournoi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const tournoi = await Tournois.findByIdAndDelete(req.params.id);
    if (!tournoi) {
      return res.status(404).json({ message: 'Tournoi non trouvé' });
    }
    res.status(200).json({ message: 'Tournoi supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const { joueurId } = req.body;
    const tournoi = await Tournois.findById(req.params.id);
    if (!tournoi) {
      return res.status(404).json({ message: 'Tournoi non trouvé' });
    }
    if (!tournoi.participants.includes(joueurId)) {
      tournoi.participants.push(joueurId);
      await tournoi.save();
    }
    const populatedTournoi = await Tournois.findById(tournoi._id).populate('participants');
    res.status(200).json(populatedTournoi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

