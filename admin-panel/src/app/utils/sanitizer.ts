import { deepClone } from '@utils/deep-clone';

export function fieldRemover<T = any>(filterKeys: string[]) {
  function replacer(key: string, value: any) {
    return (filterKeys.includes(key)) ? undefined : value;
  }
  return (o: any) => deepClone(o, replacer) as T;
}
