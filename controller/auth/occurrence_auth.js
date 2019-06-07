const UserService = require("../../service/user_service");

module.exports = (req, res, next) => {

    const token = req.header("Auth");

    if (token) {
        const user = UserService.getUserFromToken(token);
        if (user) {
            console.log(`Usuário: ${user.name} acessando...`);
            return next();
        }
    }

    return res.status(401).json({ success: false, message: "Não autorizado!" });
};
