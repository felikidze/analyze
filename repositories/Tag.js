import pool from "../db.js";

class TagRepository {
  static async createTag({name, color}) {
    const response = await pool.query("INSERT INTO tags (name, color) VALUES ($1, $2) RETURNING *", [name, color]);

    return response.rows[0];
  }
}

export default TagRepository;