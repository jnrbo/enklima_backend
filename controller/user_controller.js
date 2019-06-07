var express = require('express'); // Biblioteca usada para fazer get/post
var UserService = require('../service/user_service');

const ValidateAdmin = require('./auth/validate_admin');


const app = express.Router();

app.use('/signup', ValidateAdmin);
app.post('/signup', (req, res) => {
    let registry = req.body.registry;
    let password = req.body.password;
    let age = req.body.age;
    let patent = req.body.patent;
    let name = req.body.name;

    let user = {
        registry: registry,
        password: password,
        age:      age,
        patent:   patent,
        name:     name,
    };

    UserService.signup(user,  (err, user) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, user: user });
    });
});

app.get('/login', (req, res) => {
    let registry = req.query.registry;
    let password = req.query.password;

    UserService.login(registry, password, (err, user) => {
        if (err) return res.json({ success: false, error: err });

        if (user) {
            let token = UserService.generateToken(user);
            res.json({ success: true, token: token, user: user});
        } else {
            res.json({ success: false, error: "Acesso negado!" });
        }
    });
});

app.post('/logout', (req, res) => {
    const token = req.header("Auth");
    if (token) {
        const user = UserService.getUserFromToken(token);
        UserService.logout(user);
    }

    res.json({ success: true })
});


module.exports = app;
