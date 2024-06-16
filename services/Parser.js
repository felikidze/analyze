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
import {default as Crawler} from 'crawler';
import {default as getSiteMapsLink} from 'sitemap-links';

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

      const {id: domainId} = (await DomainRepository.getDomainData(host)) || (await DomainRepository.createDomain(host));

      const currentStorageScan = await ScanRepository.getPageScan(url);

      const {id: scanId} = currentStorageScan
          ? (await ScanRepository.updateScan({
              pageUrl: url,
              description: JSON.stringify(objForCollectors.collectors.domain.data),
              result: tag !== Tag[0],
              authorId: user.id
          }))
          : (await ScanRepository.createScan({
              pageUrl: url,
              description: JSON.stringify(objForCollectors.collectors.domain.data),
              result: tag !== Tag[0],
              authorId: user.id,
              domain_id: domainId
          }))

      let tagId = (await TagRepository.checkTag(tag))?.id
          || (await TagRepository.createTag({name: tag, color: randomColor()})).id;

      await ScanTagRepository.createRelations({
          scanId,
          tagId
      })

      console.log('test')
  }

  static async crawlAllUrls(url) {
    const c = new Crawler();
    let obselete = [];
    console.log(`Crawling ${url}`);
    const host = new URL(url).host;
    return new Promise((pRes, pRej) => {
        c.queue({
            uri: url,
            callback: function (err, res, done) {
                if (err) throw err;
                let $ = res.$;
                try {
                    let urls = $("a");
                    Object.keys(urls).forEach((item) => {
                        if (urls[item].type === 'tag') {
                            let href = urls[item].attribs.href;
                            if (href && !obselete.includes(href) && href.includes(host)) {
                                href = href.trim();
                                obselete.push(href);
                            }
                        }
                    });
                } catch (e) {
                    console.error(`Encountered an error crawling ${url}. Aborting crawl.`);
                    done();
                    pRej();

                }
                done();
                pRes(obselete);
            }
        })
    })
  }

  static async crawlAllUrlsWithDepth(url) {
      const MAX_DEPTH = 2;
      const crawlResult = [url];
      for (let i = 0; i < MAX_DEPTH; i++) {
          await new Promise(async (pRes, pRej) => {
              const promises = crawlResult.map(async (route) => {
                  return new Promise((pRes, pRej) => {
                      setTimeout(async () => {
                          const newRoutes = await ParserService.crawlAllUrls(route);

                          newRoutes.forEach((newRoute) => {
                              if (!crawlResult.includes(newRoute)) {
                                  crawlResult.push(newRoute);
                              }
                          });

                          pRes();
                      }, 150);
                  })
              });
              await Promise.all(promises);

              pRes();
          })
      }

      console.info(crawlResult);
      return crawlResult;
  }

  static multipleMakeAnalyzeWithDelay(urls, user) {
      if (!urls.length) {
          throw new Error('Не найдено страниц относящихся к домену');
      }

      urls.length = 10;
      urls.forEach((route) => {
          setTimeout(() => {
              ParserService.makeAnalyze(route, user);
          }, 100)
      })
  }


  static async makeAnalyzeDomain(url, user) {
      console.log('test')
      const sitemapPostfix = url.at(-1) === '/' ? 'sitemap.xml' : '/sitemap.xml';

      try {
          const siteRoutes = await getSiteMapsLink(url + sitemapPostfix, 10000);
          ParserService.multipleMakeAnalyzeWithDelay(siteRoutes, user);
      } catch (e) {
          // catch блок если у домена нет sitemap.xml
          const crawlResult = await ParserService.crawlAllUrlsWithDepth(url);
          ParserService.multipleMakeAnalyzeWithDelay(crawlResult, user);
      }
  }
}

export default ParserService;