import {BaseCollector} from "./BaseCollector.js";
import {default as axios} from 'axios'
import {default as dns} from 'dns';
import {URL} from 'node:url';

export class DomainCollector extends BaseCollector {
    static async getData(obj) {
        const urlObj = new URL(obj.url);
        const {address: ip} = await dns.promises.lookup(urlObj.host);
        const domainInfo = await axios.get(`http://ip-api.com/json/${ip}`, {
            params: {
                fields: 'status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query'
            }
        });
        obj.collectors.domain = domainInfo;
    }
}