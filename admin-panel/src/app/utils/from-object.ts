export function fromObj(obj: any): ISelect[] {
  let array = [];
  for (const key in obj) {
    array.push({ value: key, label: obj[key] });
  }
  return array;
}

export interface ISelect {
  key: string;
  value: any;
}
