import ParserService from "../services/Parser.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";

class ParserController {
  static async makeAnalyze(req, res) {
    const { url } = req.body.data;
    const { fingerprint } = req;
    console.log(`url - ${url}`);
    try {
      await ParserService.makeAnalyze(url, req.user)
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default ParserController;