const Sauces = require('../models/Sauces');

exports.getAllSauces = (req,res) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
 
exports.getSauce = (req,res) => {
  const sauceId = req.path.split('/').join('');
  Sauces.findById(sauceId)
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));
};

exports.editSauce = (req,res) => {
  const sauceId = req.path.split('/').join('');
  /*Sauces.findById(sauceId)
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));*/
};

exports.deleteSauce = (req,res) => {
  const sauceId = req.path.split('/').join('');
  /*Sauces.findById(sauceId)
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));*/
};

exports.likeSauce = (req,res) => {
  const sauceId = req.path.split('/').join('');
  /*Sauces.findById(sauceId)
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));*/
};

exports.createSauce = (req,res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
};
