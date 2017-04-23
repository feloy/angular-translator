export interface Source {
  msgs: Msg[];
}

export interface FormatMessageCase {
  key: string;
  value: string | FormatMessage;
}

export interface FormatMessage {
  type: 'select' | 'plural';
  value: string | FormatMessageCase[];
}

export interface Msg {
  id: string;
  desc?: string;
  meaning?: string;
  locations?: Location[];
  content: string;
  icu: FormatMessage;
}

export interface Location {
  sourcefile: string;
  linenumber: number;
}
