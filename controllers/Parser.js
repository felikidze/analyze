import ParserService from "../services/Parser.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";

class ParserController {
  static async getData(req, res) {
    const { url } = req.body;
    const { fingerprint } = req;
    console.log(`url - ${url}`);
    try {
      await ParserService.makeAnalyze(url)
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default ParserController;