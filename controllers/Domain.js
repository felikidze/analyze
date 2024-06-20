import ErrorsUtils from "../utils/Errors.js";
import DomainService from "../services/Domain.js";

class DomainController {
  static async getListDomain(req, res) {
    try {
      const { page, pageSize } = req.query;
      const result = await DomainService.getList(page, pageSize);
      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default DomainController;