const fs = require('fs');
const Sauces = require('../models/Sauces');

exports.getAllSauces = (req,res) => {
  Sauces.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};
 
exports.getSauce = (req,res) => {
  const sauceId = req.params.id;
  Sauces.findById(sauceId)
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));
};

exports.editSauce = (req,res) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req,res) => {
  Sauces.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauces.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req,res) => {
  const sauceId = req.params.id;
  const likeStatus = req.body.like;
  const userId = req.body.userId;
  switch(likeStatus) {
    case 1:
      Sauces.updateOne({ _id: sauceId }, { likes: +1, usersLiked: userId })
      .then(() => res.status(200).json({ message: 'Like enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      break;
    case -1:
      Sauces.updateOne({ _id: sauceId }, { dislikes: +1, usersDisliked: userId })
      .then(() => res.status(200).json({ message: 'Dislike enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      break;
    case 0:
      Sauces.findOne({ _id: sauceId })
      .then( sauce => {
        if(sauce.usersLiked.includes(userId)) {
          sauce.usersLiked.pull(userId);
          sauce.likes--;
          sauce.save()
          .then(() => res.status(201).json({ message: "Like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
        } 
        else if(sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked.pull(userId);
          sauce.dislikes--;
          sauce.save()
          .then(() => res.status(201).json({ message: "Dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
        } else {
          res.status(403).json({ message: "Impossible d'interagir."})
          .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch(error => res.status(500).json({ error }));
      break;
  }
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
