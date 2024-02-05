export function fromObj(o: any): ISelect[] {
  const result = [];
  // tslint:disable-next-line: forin
  for (const key in o) {
    result.push({ label: o[key], value: key });
  }
  return result;
}

export function fromObjWithNum(o: any): ISelect[] {
  const result = [];
  // tslint:disable-next-line: forin
  for (const key in o) {
    result.push({ label: o[key], value: +key });
  }
  return result;
}

export interface ISelect {
  label: string;
  value: any;
}
