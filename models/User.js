const knex = require('knex');
const bcrypt = require('bcrypt');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'tousif123',
    database: 'NewDB'
  }
});

class User {
  static async findByEmail(email) {
    return await db('users').where('email', email).first();
  }

  static async create(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({ firstName, lastName, email, password: hashedPassword });
  }
}

module.exports = User;
