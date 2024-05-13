import pool from "../db.js";

class DomainRepository {
  static async createDomain(hostName) {
    const response = await pool.query("INSERT INTO domains (url, created_at) VALUES ($1, $2) RETURNING *", [hostName, new Date().toISOString()]);

    return response.rows[0];
  }

  static async updateDomain(hostName) {
    const response = await pool.query("UPDATE domains SET updated_at=$1 WHERE url=$2 RETURNING *", [new Date().toISOString(), hostName]);

    return response.rows[0];
  }

  static async getDomainData(hostName) {
    const response = await pool.query("SELECT * FROM domains where url=$1", [hostName]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
}

export default DomainRepository;