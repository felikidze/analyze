import {TextCollector} from '../collectors/TextCollector.js'
import {DomainCollector} from "../collectors/DomainCollector.js";
import {NeuroCollector} from "../collectors/NeuroCollector.js";

class ParserService {
  static async makeAnalyze(url) {
      const objForCollectors = {
          url,
          collectors: {}
      };
      await Promise.all([
          TextCollector.getData(objForCollectors),
          DomainCollector.getData(objForCollectors)
      ]);
      await NeuroCollector.getData(objForCollectors);
      // objForCollectors содержит в себе инфу с плейн текстом, по домену, по обработке нейронкой

      console.log(test);
  }
}

export default ParserService;