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

  static async getDomainIds() {
    const response = await pool.query("SELECT id FROM domains");

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getDomainDataForChart(domainId) {
    const response = await pool.query("SELECT domains.url, name, COUNT(*) FROM tags JOIN scan_tags ON tags.id = scan_tags.tag_id JOIN scans ON scan_tags.scan_id = scans.id JOIN domains ON scans.domain_id = domains.id\n WHERE domains.id=$1 GROUP BY name, domains.url", [domainId]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }
}

export default DomainRepository;