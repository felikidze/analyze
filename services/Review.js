import ReviewRepository from "../repositories/Review.js";
import UserRepository from "../repositories/User.js";

class ReviewService {
  static async getReviews(domainId) {
      const reviews = await ReviewRepository.getReviews(+domainId);

      if (!reviews) {
          return [];
      }

      const reviewsDto = [];

      await Promise.all(reviews.map(async (review) => {
          const reviewAuthorInfo = await UserRepository.getUserDataById(review.author_id);

          reviewsDto.push({
              description: review.description,
              userName: reviewAuthorInfo.username
          })
      }));

      return reviewsDto;
  }
  static async sendMessage(description, authorId, domainId) {
      const domainIds = await ReviewRepository.createReview(description, authorId, domainId);
  }
}

export default ReviewService;