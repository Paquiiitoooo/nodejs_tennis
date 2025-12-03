// Contrôleur de base pour les opérations CRUD
// TODO: Importer votre modèle
// const Model = require('../models/model');

// GET - Récupérer tous les documents
exports.getAll = async (req, res) => {
  try {
    // TODO: Implémenter la logique pour récupérer tous les documents
    // const documents = await Model.find();
    // res.status(200).json(documents);
    res.status(200).json({ message: 'GET all - À implémenter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - Récupérer un document par ID
exports.getById = async (req, res) => {
  try {
    // TODO: Implémenter la logique pour récupérer un document par ID
    // const document = await Model.findById(req.params.id);
    // if (!document) {
    //   return res.status(404).json({ message: 'Document non trouvé' });
    // }
    // res.status(200).json(document);
    res.status(200).json({ message: 'GET by ID - À implémenter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Créer un nouveau document
exports.create = async (req, res) => {
  try {
    // TODO: Implémenter la logique de création
    // const document = new Model(req.body);
    // const savedDocument = await document.save();
    // res.status(201).json(savedDocument);
    res.status(201).json({ message: 'POST - À implémenter' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT - Mettre à jour un document
exports.update = async (req, res) => {
  try {
    // TODO: Implémenter la logique de mise à jour
    // const document = await Model.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true, runValidators: true }
    // );
    // if (!document) {
    //   return res.status(404).json({ message: 'Document non trouvé' });
    // }
    // res.status(200).json(document);
    res.status(200).json({ message: 'PUT - À implémenter' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Supprimer un document
exports.delete = async (req, res) => {
  try {
    // TODO: Implémenter la logique de suppression
    // const document = await Model.findByIdAndDelete(req.params.id);
    // if (!document) {
    //   return res.status(404).json({ message: 'Document non trouvé' });
    // }
    // res.status(200).json({ message: 'Document supprimé avec succès' });
    res.status(200).json({ message: 'DELETE - À implémenter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

