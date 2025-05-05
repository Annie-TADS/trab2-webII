import db from "../config/dbconfig.js";

const usersDAO = {
    findAll(limit = 100, offset = 0) {
        const query = "SELECT id, cpf, name, role FROM users LIMIT ? OFFSET ?;";
        return db.prepare(query).all(limit, offset);
    },
    userCount() {
        const query = "SELECT count(*) AS qtd FROM users";

        return (db.prepare(query).get()).qtd;
    },
    findByCPF(userCPF) {
        const query = "SELECT * FROM users WHERE cpf = ?";
        return db.prepare(query).get(userCPF);
    },
    findById(userId) {
        const query = "SELECT * FROM users WHERE id = ?";
        return db.prepare(query).get(userId);
    },
    insert(user) {
        const query = "INSERT INTO users (cpf, password, name, role) VALUES (?, ?, ?, ?);"

        db.prepare(query).run(user.cpf, user.password, user.name, user.role);
    },
    update(user) {
        const query = "UPDATE users SET name = ?, password = ? WHERE id = ?";

        const updatedUser = {
            ...this.findById(user.id),
            ...user
        }

        db.prepare(query).run(updatedUser.name, updatedUser.password, updatedUser.id);
    },
    delete(userId) {
        const query = "DELETE FROM users WHERE id = ?";
        db.prepare(query).run(userId);
    } 
}

export default usersDAO;