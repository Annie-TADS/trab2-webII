import db from "../config/dbConnection";

export default addressesDAO = {
    findByUser(userId) {
        const query = "SELECT * FROM addresses WHERE userId = ?";
        return db.prepare(query).all(userId);
    },
    insert(addresses) {
        const query = "INSERT INTO addresses (number, userId) VALUES (?, ?);"

        db.prepare(query).run(phone.number, phone.userId);
    },
    update(phone) {
        const query = "UPDATE phones SET number = ?, userId = ? WHERE id = ?";
        return db.prepare(query).run(phone.number, phone.userId, phone.id);
    },
    delete(phoneId) {
        const query = "DELETE FROM phones WHERE id = ?";
        return db.prepare(query).run(phoneId);
    } 
}