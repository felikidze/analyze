import pool from "../db.js";

class DomainRepository {
  static async createReview(description, authorId, domainId) {
    const response = await pool.query("INSERT INTO review (description, author_id, domain_id, rating) VALUES ($1, $2, $3, $4) RETURNING *", [description, authorId, domainId, 5]);

    return response.rows[0];
  }

  static async getReviews(domainId) {
    const response = await pool.query("SELECT * FROM review where domain_id=$1", [domainId]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }
}

export default DomainRepository;