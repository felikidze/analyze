import pool from "../db.js";

class ScanRepository {
  static async createScan({pageUrl, description, result, authorId, domain_id}) {
    const response = await pool.query("INSERT INTO scans (url, description, result, authorId, domain_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [pageUrl, new Date().toISOString()]);

    return response.rows[0];
  }

  static async updateScan({pageUrl, description, result, authorId}) {
    const response = await pool.query("UPDATE scans SET updated_at=$1, author_id=$2, description=$3, result=$4  WHERE url=$5 RETURNING *", [new Date().toISOString(), authorId, description, result, pageUrl]);

    return response.rows[0];
  }

  static async getPageScan(pageUrl) {
    const response = await pool.query("SELECT * FROM scans where url=$1", [pageUrl]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
}

export default ScanRepository;