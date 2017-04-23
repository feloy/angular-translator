import { FormatMessage } from './source';
import parse from 'format-message-parse';

export class Icu {

  static parse(str: string): FormatMessage {
    const res = parse(str);
    if (res instanceof Array && res.length === 1 && typeof res[0] === 'string') {
      return null;
    } else if (res instanceof Array && res.length === 1 && res[0] instanceof Array) {
      switch (res[1]) {
        case 'select':
          return {
            type: res[1],
            value: JSON.stringify(res[2])
          };

        case 'plural':
          return {
            type: res[1],
            value: JSON.stringify(res[3])
          };
      }
    }
  }
}
