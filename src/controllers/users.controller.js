import usersDAO from "../models/users.dao.js";
import phonesDao from "../models/phones.dao.js";
import emailsDao from "../models/emails.dao.js";
import userRoles from "../enums/userRoles.js";
import { hashSync } from "bcrypt";

const usersController = {
    createScreen(req, res) {
        return res.render('adduser', {editing: false, user: {}});
    },
    async create(req, res) {
        const user = req.body;

        if (usersDAO.findAll().length == 0) {
            user.role = userRoles.ADMIN;
        } else {
            user.role = userRoles.CLIENTE;
        }

        if (usersDAO.findByCPF(user.cpf)) {
            throw new Error("CPF já cadastrado!");
        } 

        user.password = hashSync(user.password, 10);

        usersDAO.insert(user);

        if (!req.session?.isAuth) {
            req.session.user = {...user, password: undefined};
            req.session.isAuth = true;
            req.session.isAdmin = user.role == userRoles.ADMIN;
        }

        return res.redirect(`/`);
    },
    list(req, res) {
        const page = req.query?.page ? parseInt(req.query.page) : 0;
        const USERS_PER_PAGE = 5;

        const users = usersDAO.findAll(USERS_PER_PAGE, page ?? 0);
        const isAdmin = req.session.isAdmin;
        const currentUser = req.session.user;
        const userCount = usersDAO.userCount();

        return res.render('users', {users, isAdmin, currentUser, userCount, page});
    },
    details(req, res) {
        const {id} = req.params;

        const phones = phonesDao.findByUser(id);
        const emails = emailsDao.findByUser(id);

        const user = {
            ...usersDAO.findById(id), 
            password: undefined,
            phones,
            emails
        };

        return res.render('user', {user, isMe: user.id == req.session?.user?.id, isAdmin: req.session.isAdmin});
    },
    updateScreen(req, res) {
        const {id} = req.params;
        const user = usersDAO.findById(req.params.id);
        
        if (!req.session.isAdmin && id != req.session.user.id) {
            throw new Error("Sem autorização para editar este usuário");
        }

        return res.render('adduser', {editing: true, user});
    },
    async update(req, res) {
        const {id} = req.params;
        const user = req.body;

        if (!req.session.isAdmin && id != req.session.user.id) {
            throw new Error("Sem autorização para editar este usuário");
        }

        if (user.password) {
            user.password = hashSync(user.password, 10);
        }

        usersDAO.update(user);
        return res.redirect(`/user/${id}`);
    },
    delete(req, res) {
        const {id} = req.params;

        const foundUser = usersDAO.findById(id);

        if (foundUser.role == userRoles.ADMIN && id != req.session.user.id) {
            throw new Error("Sem permissão para excluir outros admins");
        } 

        phonesDao.findByUser(id).forEach((phone) => {
            phonesDao.delete(phone.id);
        });
        emailsDao.findByUser(id).forEach((email) => {
            emailsDao.delete(email.id);
        });
        usersDAO.delete(id);

        if (req.session.user.id == id) {
            req.session.destroy();
        }

        return res.status(200).send('Excluído com sucesso');
    }
}

export default usersController;