import bcrypt from "bcrypt";
import usersDAO from "../models/users.dao.js";
import userRoles from "../enums/userRoles.js";

const authController = {
    index(req, res) {
        if (req.session?.isAuth) {
            return res.redirect('/users');
        }

        const {signin} = req.query;

        return res.render('login', {isSignin: signin});
    },
    async login(req, res) {
        const {cpf, password} = req.body;

        if (!cpf) {
            throw new Error("Cpf não foi informado");
        } else if (!password) {
            throw new Error("Senha não foi informada");
        }

        const foundUser = usersDAO.findByCPF(cpf);
        if (foundUser) {
            const match = await bcrypt.compare(password, foundUser.password);

            if(match) {
                req.session.user = {...foundUser, password: undefined};
                req.session.isAuth = true;
                req.session.isAdmin = foundUser.role == userRoles.ADMIN;

                return res.redirect('/users')
            }
        }

        throw new Error("CPF ou senha incorretos");
    },
    logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }
}

export default authController;