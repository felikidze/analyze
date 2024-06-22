import ScanRepository from "../repositories/Scan.js";
import ScanTagRepository from "../repositories/ScanTag.js";
import TagRepository from "../repositories/Tag.js";

class ScanService {
  static async getList(page, pageSize) {
      const [scans, {count}] = await Promise.all([
          ScanRepository.getListScan(pageSize, (page-1)*pageSize),
          ScanRepository.getTotalScans()
      ]);
      await Promise.all(scans?.map(async (item) => {
          const tagId = (await ScanTagRepository.getTagByScan(item.id))?.tag_id;
          item.tag = await TagRepository.getTag(tagId);

          return item;
      }));


      return {
          list: scans,
          total: count
      };
  }
}

export default ScanService;