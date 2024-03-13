// client side
export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function createDataURI(file: File) {
  const type = file.type;
  const buffer: Buffer = Buffer.from(await (file as File).arrayBuffer());
  const dataURI: string = `data:${type};base64,${buffer.toString("base64")}`;
  return dataURI;
}
