import {TextCollector} from '../collectors/TextCollector.js'
import {DomainCollector} from "../collectors/DomainCollector.js";

class ParserService {
  static async getData(url) {
      const objForCollectors = {
          url,
          collectors: {}
      };
      await Promise.all([
          TextCollector.getData(objForCollectors),
          DomainCollector.getData(objForCollectors)
      ]);

      // objForCollectors содержит в себе инфу с плейн текстом и инфу по домену

  }
}

export default ParserService;