import db from "../config/dbconfig.js";

const emailsDAO = {
    findByUser(userId) {
        const query = "SELECT * FROM emails WHERE userId = ? ORDER BY main DESC;";
        return db.prepare(query).all(userId);
    },
    findById(emailId) {
        const query = "SELECT * FROM emails WHERE id = ?";
        return db.prepare(query).get(emailId);
    },
    findUserMain(userId) {
        const query = "SELECT * FROM emails WHERE userId = ? AND main = true;";
        return db.prepare(query).get(userId);
    },
    insert(email) {
        const query = "INSERT INTO emails (email, main, userId) VALUES (?, ?, ?);"

        db.prepare(query).run(email.email, email.main, email.userId);
    },
    update(email) {
        const query = "UPDATE emails SET email = ?, main = ?, userId = ? WHERE id = ?;";

        const updatedEmail = {
            ...this.findById(email.id),
            ...email
        };

        db.prepare(query).run(updatedEmail.email, updatedEmail.main, updatedEmail.userId, updatedEmail.id);
    },
    delete(emailId) {
        const query = "DELETE FROM emails WHERE id = ?;";
        db.prepare(query).run(emailId);
    } 
}

export default emailsDAO;