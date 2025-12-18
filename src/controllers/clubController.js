const { Club } = require('../models/model');

exports.getAll = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Erreur dans getAll clubs:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club non trouvé' });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const club = new Club(req.body);
    const savedClub = await club.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

