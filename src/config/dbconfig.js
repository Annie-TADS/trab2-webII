import db from 'better-sqlite3'

export default db('database.db',  {
    verbose: console.log
});
