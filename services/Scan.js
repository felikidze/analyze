import ScanRepository from "../repositories/Scan.js";
import ScanTagRepository from "../repositories/ScanTag.js";
import TagRepository from "../repositories/Tag.js";

class ScanService {
  static async getList() {
      const scans = await ScanRepository.getListScan();
      await Promise.all(scans.map(async (item) => {
          const tagId = (await ScanTagRepository.getTagByScan(item.id))?.tag_id;
          item.tag = await TagRepository.getTag(tagId);

          return item;
      }));


      return scans;
  }
}

export default ScanService;