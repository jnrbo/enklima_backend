const crypto = require('crypto');
const User = require('../model/user');
const UserType = require('../enum/user_type');

let loggedUsers = [];

class UserService {

    static logged() {
        return loggedUsers
    }

    static signup(user, callback) {
        const encryptedPassword = crypto.createHash('sha1').update(user.password).digest('hex');
        new User({
            registry: user.registry,
            password: encryptedPassword,
            patent: user.patent,
            age: user.age,
            name: user.name,
            type: UserType.USER
        }).save(callback);
    }

    static login(registry, password, callback) {
        const encryptedPassword = crypto.createHash('sha1').update(password).digest('hex');

        User.where({registry: registry, password: encryptedPassword}).findOne(callback);
    }

    static logout(user) {
        for (let i = 0; i < loggedUsers.length; i++) {
            if (loggedUsers[i].registry === user.registry) {
                loggedUsers.splice(i, 1);
            }
        }
    }

    static generateToken(user) {
        let date = (new Date()).valueOf().toString();

        let token = crypto.createHash('sha256').update(date + "_enklima").digest('hex');

        UserService.logout(user); // remove old user before new login

        loggedUsers.push({
            user: user,
            registry: user.registry,
            token: token
        });

        return token;
    }

    static getUserFromToken(token) {
        for (let i = 0; i < loggedUsers.length; i++) {
            if (loggedUsers[i].token === token) {
                return loggedUsers[i].user;
            }
        }
        return null;
    }

    static isAdmin(user) {
        console.log(user.type);
        return user.type === UserType.ADMIN;
    }
}

module.exports = UserService;
