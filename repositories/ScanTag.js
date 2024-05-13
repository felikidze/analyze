import pool from "../db.js";

class ScanTagRepository {
  static async createRelations({scanId, tagId}) {
    const response = await pool.query("INSERT INTO scan_tags (scan_id, tag_id) VALUES ($1, $2) RETURNING *", [scanId, tagId]);

    return response.rows[0];
  }
}

export default ScanTagRepository;