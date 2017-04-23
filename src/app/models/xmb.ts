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
    let xmb = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE messagebundle [
<!ELEMENT messagebundle (msg)*>
<!ATTLIST messagebundle class CDATA #IMPLIED>

<!ELEMENT msg (#PCDATA|ph|source)*>
<!ATTLIST msg id CDATA #IMPLIED>
<!ATTLIST msg seq CDATA #IMPLIED>
<!ATTLIST msg name CDATA #IMPLIED>
<!ATTLIST msg desc CDATA #IMPLIED>
<!ATTLIST msg meaning CDATA #IMPLIED>
<!ATTLIST msg obsolete (obsolete) #IMPLIED>
<!ATTLIST msg xml:space (default|preserve) "default">
<!ATTLIST msg is_hidden CDATA #IMPLIED>

<!ELEMENT source (#PCDATA)>

<!ELEMENT ph (#PCDATA|ex)*>
<!ATTLIST ph name CDATA #REQUIRED>

<!ELEMENT ex (#PCDATA)>
]>
<messagebundle>`;

    src.msgs.map((s: Msg) => {
      let target = '';
      const list = tr.msgs.filter((m: Msg) => m.id === s.id);
      if (list.length > 0) {
        target = list[0].content;
      }
      xmb += `
  <msg id="` + s.id + `">` + target + `</msg>`;
    });

    xmb += `
</messagebundle>`;
    return xmb;
  }
}
