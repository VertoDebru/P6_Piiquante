const User = require('../models/User');

exports.userSign = (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(new Error('Bad request!'));
    }
    console.log("New Sign up.");
    console.log(req.body.email + req.body.password);
    
    User.findOne({ email: req.body.email })
    .then( user => {
        if(user) {
            res.status(401).json({ message: 'Email existant!'});
        }
        else {
            console.log('New registery.');
            let user = new User({
                ...req.body
            });
            user.save()
            .then(() => res.status(200).json({ userId: user._id, token: 'tokenExample' }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(401).json({ error }));
};

exports.userLogin = (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(new Error('Bad request!'));
    }
    console.log("New login : " + req.body.email);
    User.findOne({ email: req.body.email })
    .then( user => {
        console.log(user.password);
        if(user.password == req.body.password) {
            res.status(200).json({ userId: user._id, token: 'tokenExample' });
        }
        else {
            res.status(401).json({ message: 'Mot de passe incorrect!'});
        }
    })
    .catch(error => res.status(401).json({  message: 'Email inconnu!' }));
};