const { Championnat_Equipe } = require('../models/model');

exports.getAll = async (req, res) => {
  try {
    const championnats = await Championnat_Equipe.find().populate('clubs');
    res.status(200).json(championnats);
  } catch (error) {
    console.error('Erreur dans getAll championnats:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const championnat = await Championnat_Equipe.findById(req.params.id).populate('clubs');
    if (!championnat) {
      return res.status(404).json({ message: 'Championnat non trouvé' });
    }
    res.status(200).json(championnat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const championnat = new Championnat_Equipe(req.body);
    const savedChampionnat = await championnat.save();
    const populatedChampionnat = await Championnat_Equipe.findById(savedChampionnat._id).populate('clubs');
    res.status(201).json(populatedChampionnat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const championnat = await Championnat_Equipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('clubs');
    if (!championnat) {
      return res.status(404).json({ message: 'Championnat non trouvé' });
    }
    res.status(200).json(championnat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const championnat = await Championnat_Equipe.findByIdAndDelete(req.params.id);
    if (!championnat) {
      return res.status(404).json({ message: 'Championnat non trouvé' });
    }
    res.status(200).json({ message: 'Championnat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

