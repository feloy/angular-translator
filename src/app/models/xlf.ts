import { Translation } from './translation';
import { Source, Msg } from './source';

import js2xliff from 'xliff/jsToXliff12';

export class Xlf {

  static parseSource(data: string): Source {
    try {
      const source = {
        msgs: []
      };
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const domMsgs = xmlDoc.getElementsByTagName('trans-unit');
      for (let i = 0; i < domMsgs.length; i++) {
        const domMsg = domMsgs.item(i);
        const msg: Msg = {
          id: domMsg.getAttribute('id'),
          locations: [],
          content: domMsg.getElementsByTagName('source')[0].innerHTML
        };

        const notes = domMsg.getElementsByTagName('note');
        for (let j = 0; j < notes.length; j++) {
          const note = notes.item(j);
          const from = note.getAttribute('from');
          if (from === 'description') {
            msg.desc = note.textContent;
          } else if (from === 'meaning') {
            msg.meaning = note.textContent;
          }
        }

        const contextGroups = domMsg.getElementsByTagName('context-group');
        for (let j = 0; j < contextGroups.length; j++) {
          const contextGroup = contextGroups.item(j);
          const purpose = contextGroup.getAttribute('purpose');
          if (purpose !== 'location') {
            continue;
          }
          const contexts = contextGroup.getElementsByTagName('context');
          let sourcefile = '', linenumber = -1;
          for (let k = 0; k < contexts.length; k++) {
            const context = contexts.item(k);
            const type = context.getAttribute('context-type');
            switch (type) {
              case 'sourcefile': sourcefile = context.textContent; break;
              case 'linenumber': linenumber = parseInt(context.textContent, 10); break;
            }
          }
          msg.locations.push({ sourcefile, linenumber });
        }

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
      const domMsgs = xmlDoc.getElementsByTagName('trans-unit');
      for (let i = 0; i < domMsgs.length; i++) {
        const domMsg = domMsgs.item(i);
        const msg: Msg = {
          id: domMsg.getAttribute('id'),
          content: domMsg.getElementsByTagName('target')[0].innerHTML
        };

        translation.msgs.push(msg);
      }
      return translation;
    } catch (e) {
      return null;
    }
  }

  static export(src: Source, tr: Translation): string {
    const map = {};
    src.msgs.map(s => {
      let target = '';
      const list = tr.msgs.filter((m: Msg) => m.id === s.id);
      if (list.length > 0) {
        target = list[0].content;
      }
      map[s.id] = {
        source: s.content,
        target: target
      };
    });

    const js = {
      'resources': {
        'ng2.template': map
      },
      'sourceLanguage': 'en',
      'targetLanguage': 'fr'
    };
    console.log(js);
    return '<?xml version="1.0" encoding="UTF-8" ?>' + js2xliff(js, (err, res) => {
      return res;
    });
  }

}
