import {TextCollector} from '../collectors/TextCollector.js'
import {DomainCollector} from "../collectors/DomainCollector.js";
import {NeuroCollector} from "../collectors/NeuroCollector.js";
import ScanRepository from "../repositories/Scan.js";
import {Tag} from '../models/Tag.js';
import DomainRepository from "../repositories/Domain.js";
import {URL} from "node:url";
import TagRepository from "../repositories/Tag.js";
import {randomColor} from 'randomcolor'
import ScanTagRepository from "../repositories/ScanTag.js";

class ParserService {
  static async makeAnalyze(url, user) {
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


      const host = new URL(url).host;
      const tag = objForCollectors.collectors.neuro.class;

      const {id: domainId} = await DomainRepository.createDomain(host);
      const {id: scanId} = await ScanRepository.createScan({
          pageUrl: url,
          description: JSON.stringify(objForCollectors.collectors.domain.data),
          result: tag !== Tag[0],
          authorId: user.id,
          domain_id: domainId
      })

      let tagId = (await TagRepository.checkTag(tag))?.id || (await TagRepository.createTag({name: tag, color: randomColor()})).id;

      await ScanTagRepository.createRelations({
          scanId,
          tagId
      })

      console.log('test')
  }
}

export default ParserService;