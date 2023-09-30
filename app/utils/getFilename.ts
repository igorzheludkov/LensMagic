export default function getFilename(uri: string) {
  const array = uri.split('/')
  const filename = array[array.length - 1]
  return filename
}
