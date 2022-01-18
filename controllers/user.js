const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.userSign = (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Empty input!' });
    }
    console.log("New Sign up for :" + req.body.email);
    bCrypt.hash(req.body.password, 10)
    .then( hash => {
        console.log('New registery.');
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ 
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.userLogin = (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Empty input!' });
    }
    console.log("New login : " + req.body.email);
    User.findOne({ email: req.body.email })
    .then( user => {
        if(!user) return res.status(401).json({ error: 'Utilisateur inexistant!' });
        
        bCrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) return res.status(401).json({ error: 'Mot de passe incorrect!' });

            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(401).json({  message: 'Email inconnu!' }));
};