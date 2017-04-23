import { Icu } from './icu';
import { Translation } from './translation';
import { Source, Msg } from './source';

export class Xmb {

  static parseSource(data: string): Source {
    try {
      const source = {
        msgs: []
      };
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const domMsgs = xmlDoc.getElementsByTagName('msg');
      for (let i = 0; i < domMsgs.length; i++) {
        const domMsg = domMsgs.item(i);
        const msg: Msg = {
          id: domMsg.getAttribute('id'),
          desc: domMsg.getAttribute('desc'),
          meaning: domMsg.getAttribute('meaning'),
          locations: [],
          content: '',
          icu: null
        };
        const domLocations = domMsg.getElementsByTagName('source');
        for (let j = domLocations.length - 1; j >= 0; j--) {
          const domLocation = domLocations.item(j);
          const [sourcefile, linenumber] = domLocation.textContent.split(':');
          msg.locations.push({ sourcefile, linenumber: parseInt(linenumber, 10) });
          domMsg.removeChild(domLocation);
        }
        msg.content = domMsg.innerHTML;
        msg.icu = Icu.parse(domMsg.innerHTML);
        source.msgs.push(msg);
      }

      return source;
    } catch (e) {
      return null;
    }
  }

    static parseTranslation(data: string): Translation {
    try {
      const translation = {
        msgs: []
      };
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const domMsgs = xmlDoc.getElementsByTagName('msg');
      for (let i = 0; i < domMsgs.length; i++) {
        const domMsg = domMsgs.item(i);
        const msg: Msg = {
          id: domMsg.getAttribute('id'),
          content: '',
          icu: null
        };
        const domLocations = domMsg.getElementsByTagName('source');
        for (let j = domLocations.length - 1; j >= 0; j--) {
          const domLocation = domLocations.item(j);
          domMsg.removeChild(domLocation);
        }
        msg.content = domMsg.innerHTML;
        msg.icu = Icu.parse(domMsg.innerHTML);
        translation.msgs.push(msg);
      }

      return translation;
    } catch (e) {
      return null;
    }
  }

  static export(src: Source, tr: Translation): string {

    return '';
  }
}
