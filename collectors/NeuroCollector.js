import {BaseCollector} from "./BaseCollector.js";
import {default as axios} from 'axios';

export class NeuroCollector extends BaseCollector {
    static async getData(obj) {
        const neuroInfo = await axios.get('http://localhost:8000/neuro/get-class', {
            data: {
                plainText: obj.collectors.text
            }
        });
        obj.collectors.neuro = neuroInfo.data;
    }
}