import phonesDao from "../models/phones.dao.js";

const phonesController = {
    create(req, res) {
        const phone = req.body;

        phone.userId = req.session.user.id;
        phone.main = phonesDao.findByUser(phone.userId).length == 0 ? 1 : 0;

        phonesDao.insert(phone);

        return res.redirect(`/user/${phone.userId}`);
    },
    toggleMain(req, res) {
        const {id} = req.params;
        const phone = phonesDao.findById(id);

        if (!phone) {
            throw res.status(404).send("Telefone não encontrado");
        }
        if (!req.session.isAdmin && phone.userId != req.session.user.id) {
            throw new Error("Sem autorização para editar este telefone");
        }

        phone.main = phone.main == 1 ? 0 : 1;
        verifyMainPhone(phone);

        phonesDao.update(phone);
        return res.status(200).send(`Atualizado com sucesso!`);
    },
    delete(req, res) {
        const {id} = req.params;

        const foundPhone = phonesDao.findById(id);

        if (!req.session.isAdmin && foundPhone.userId != req.session.user.id) {
            throw new Error("Sem autorização para remover este telefone");
        }

        phonesDao.delete(id);
        if (foundPhone.main == 1) {
            foundPhone.main = 0;
            verifyMainPhone(foundPhone);
        }

        return res.status(200).send(`Excluído com sucesso!`);
    }
}

function verifyMainPhone(phone) {    
    if (phone.main == 1) {
        const previousMain = phonesDao.findUserMain(phone.userId);

        phonesDao.update({...previousMain, main: 0});
    } else {
        const otherPhones = phonesDao.findByUser(phone.userId).filter((p) => p.id != phone.id);

        if (otherPhones.length == 0) {
            phone.main = 1;
        } else {
            phonesDao.update({...otherPhones[0], main: 1});
        }
    }
}

export default phonesController;