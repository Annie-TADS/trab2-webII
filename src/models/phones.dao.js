import db from "../config/dbconfig.js";

const phonesDAO = {
    findByUser(userId) {
        const query = "SELECT * FROM phones WHERE userId = ? ORDER BY main DESC;";
        return db.prepare(query).all(userId);
    },
    findById(phoneId) {
        const query = "SELECT * FROM phones WHERE id = ?;";
        return db.prepare(query).get(phoneId);
    },
    findUserMain(userId) {
        const query = "SELECT * FROM phones WHERE userId = ? AND main = true;";
        return db.prepare(query).get(userId);
    },
    insert(phone) {
        const query = "INSERT INTO phones (number, ddd, country_code, main, userId) VALUES (?, ?, ?, ?, ?);"    

        db.prepare(query).run(phone.number, phone.ddd, phone.country_code, phone.main, phone.userId);
    },
    update(phone) {
        const query = "UPDATE phones SET number = ?, ddd = ?, country_code = ?, main = ?, userId = ? WHERE id = ?;";

        const updatedPhone = {
            ...this.findById(phone.id),
            ...phone
        };

        db.prepare(query).run(updatedPhone.number, updatedPhone.ddd, updatedPhone.country_code, updatedPhone.main, updatedPhone.userId, updatedPhone.id);
    },
    delete(phoneId) {
        const query = "DELETE FROM phones WHERE id = ?;";
        db.prepare(query).run(phoneId);
    } 
}

export default phonesDAO;