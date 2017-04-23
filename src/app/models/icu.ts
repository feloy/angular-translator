import { FormatMessage, FormatMessageCase } from './source';
import parse from 'format-message-parse';

export class Icu {

  static parse(str: string): FormatMessage {
    const res = parse(str);
    return this.subparse(res, true);
  }

  static subparse(res: any, returnNullIfString: boolean) {
    if (res instanceof Array && res.length === 1 && typeof res[0] === 'string') {
      return returnNullIfString ? null : res[0];
    } else if (res instanceof Array && res.length === 1 && res[0] instanceof Array) {

      let ret: string | FormatMessage = null;
      const cases: FormatMessageCase[] = [];
      let rawCases;

      switch (res[0][1]) {
        case 'select':
          rawCases = res[0][2];
          for (const key in rawCases) {
            if (rawCases.hasOwnProperty(key)) {
              cases.push({ key: key, value: this.subparse(rawCases[key], false) });
            }
          }
          ret = {
            type: 'select',
            value: cases
          };
          break;

        case 'plural':
          rawCases = res[0][3];
          for (const key in rawCases) {
            if (rawCases.hasOwnProperty(key)) {
              cases.push({ key: key, value: this.subparse(rawCases[key], false) });
            }
          }
          ret = {
            type: 'plural',
            value: cases
          };
          break;

        default:
          ret = res.join(' ');
      }
      return ret;
    } else {
      return res.join('');
    }
  }
}
