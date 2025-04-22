import db from "../config/dbConnection";

export default usersDAO = {
    findAll(limit = 100, offset = 0) {
        const query = "SELECT * FROM users LIMIT ? OFFSET ?;";
        return db.prepare(query).all(limit, offset);
    },
    findByCPF(userCPF) {
        const query = "SELECT * FROM users WHERE cpf = ?";
        return db.prepare(query).get(userCPF);
    },
    insert(user) {
        const query = "INSERT INTO users (cpf, password, name, role) VALUES (?, ?, ?, ?);"

        db.prepare(query).run(user.cpf, user.name, user.password, user.role);
    },
    update(user) {
        const query = "UPDATE users SET name = ?, password = ? WHERE id = ?";
        return db.prepare(query).run(user.name, user.password, user.id);
    },
    delete(userId) {
        const query = "DELETE FROM users WHERE id = ?";
        return db.prepare(query).run(userId);
    } 
}