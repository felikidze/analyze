import ErrorsUtils from "../utils/Errors.js";
import ReviewService from "../services/Review.js";

class ReviewController {
  static async getListReviews(req, res) {
    try {
      const { domainId } = req.query;
      const result = await ReviewService.getReviews(domainId);
      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
  static async sendMessage(req, res) {
    try {
      const { message, domainId } = req.body.data;
      const result = await ReviewService.sendMessage(message, req.user.id, domainId);
      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default ReviewController;