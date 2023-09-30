export default async function fetchLocalPhoto(uri: string) {
  const response = await fetch(uri)
  const blobImage = await response.blob()
  return blobImage
}
