export function truncateBase64(str: string) {
  return str.substr(str.indexOf(',') + 1);
}
