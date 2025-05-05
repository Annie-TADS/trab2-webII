import emailsDao from "../models/emails.dao.js";

const emailsController = {
    create(req, res) {
        const email = req.body;

        email.userId = req.session.user.id;
        email.main = emailsDao.findByUser(email.userId).length == 0 ? 1 : 0;

        emailsDao.insert(email);

        return res.redirect(`/user/${email.userId}`);
    },
    toggleMain(req, res) {
        const {id} = req.params;
        const email = emailsDao.findById(id);

        if (!email) {
            throw new Error("Email não encontrado");
        }
        if (!req.session.isAdmin && email.userId != req.session.user.id) {
            throw new Error("Sem autorização para editar este endereço");
        }

        email.main = email.main == 0 ? 1 : 0;
        verifyMainEmail(email);

        emailsDao.update(email);
        return res.status(200).send(`Atualizado com sucesso!`);
    },
    delete(req, res) {
        const {id} = req.params;

        const foundEmail = emailsDao.findById(id);

        if (!req.session.isAdmin && foundEmail.userId != req.session.user.id) {
            throw new Error("Sem autorização para remover este endereço");
        }

        emailsDao.delete(id);
        if (foundEmail.main == 1) {
            foundEmail.main = 0;
            verifyMainEmail(foundEmail);
        }

        return res.status(200).send(`Excluído com sucesso!`);
    }
}

function verifyMainEmail(email) {
    if (email.main == 1) {
        const previousMain = emailsDao.findUserMain(email.userId);

        emailsDao.update({...previousMain, main: 0});
    } else {
        const otheremails = emailsDao.findByUser(email.userId).filter((e) => e.id != email.id);

        if (otheremails.length == 0) {
            email.main = 1;
        } else {
            emailsDao.update({...otheremails[0], main: 1});
        }
    }
}

export default emailsController;