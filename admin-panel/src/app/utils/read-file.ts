export function readFile(f: File) {
  const reader = new FileReader();
  reader.readAsDataURL(f);
  return new Promise<string>((res, rej) => {
    reader.onload = (ev: any) => {
      res(ev.currentTarget.result);
    };
    reader.onerror = () => {
      rej(Error('Couldn\'t load the file'));
    };
  });
}
