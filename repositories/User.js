import pool from "../db.js";

class UserRepository {
  static async createUser({ userName, hashedPassword, role, email }) {
    const response = await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [userName, hashedPassword, email]);

    return response.rows[0];
  }

  static async getUserData(userName) {
    const response = await pool.query("SELECT * FROM users where username=$1", [userName]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
}

export default UserRepository;