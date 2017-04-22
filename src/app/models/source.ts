export interface Source {
  msgs: Msg[];
}

export interface Msg {
  id: string;
  desc?: string;
  meaning?: string;
  locations?: Location[];
  content: string;
}

export interface Location {
  sourcefile: string;
  linenumber: number;
}
