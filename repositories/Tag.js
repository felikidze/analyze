import pool from "../db.js";

class TagRepository {
  static async createTag({name, color}) {
    const response = await pool.query("INSERT INTO tags (name, color) VALUES ($1, $2) RETURNING *", [name, color]);

    return response.rows[0];
  }
  static async checkTag(name) {
    const response = await pool.query("SELECT * FROM tags where name=$1", [name]);

    return response.rows?.[0];
  }
  static async getTag(id) {
    const response = await pool.query("SELECT * FROM tags where id=$1", [id]);

    return response.rows?.[0];
  }
}

export default TagRepository;