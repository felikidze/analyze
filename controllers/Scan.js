import ErrorsUtils from "../utils/Errors.js";
import ScanService from "../services/Scan.js";

class ScanController {
  static async getListScan(req, res) {
    try {
      const { page, pageSize } = req.query;
      const result = await ScanService.getList(page, pageSize)
      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default ScanController;