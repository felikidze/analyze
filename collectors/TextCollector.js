import {htmlToText} from 'html-to-text'
import {default as got} from 'got'
import {BaseCollector} from "./BaseCollector.js";
export class TextCollector extends BaseCollector{
    static async getData(obj) {
        const urlHtml = await got(obj.url);
        const body = urlHtml.body;
        obj.collectors.text = htmlToText(body);
    }
}