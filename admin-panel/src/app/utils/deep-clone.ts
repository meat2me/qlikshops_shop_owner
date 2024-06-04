export function deepClone<T = any>(a: T, replacerFunc: ( key: string, value: any) => any = null) {
  return JSON.parse(JSON.stringify(a, replacerFunc));
}
