import DomainRepository from "../repositories/Domain.js";

class DomainService {
  static async getList(page, pageSize) {
      const [domainIds, {count}] = await Promise.all([
          DomainRepository.getDomainIds(pageSize, (page-1)*pageSize),
          DomainRepository.getTotalDomains()
      ])

      const resObj = {};

      await Promise.all(domainIds.map(async ({id}) => {
          const response = await DomainRepository.getDomainDataForChart(id);

          response.forEach((el) => {
                const {name, url} = el;

                if (!resObj[url]) {
                    resObj[url] = {[name]: +el.count};
                } else {
                    resObj[url] = {...resObj[url], [name]: +el.count};
                }

                resObj[url] = {...resObj[url], id}
          });

          console.info(response);
      }));

      return {
          list: resObj,
          total: count
      };
  }
}

export default DomainService;