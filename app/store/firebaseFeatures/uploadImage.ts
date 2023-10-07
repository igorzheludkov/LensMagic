import { storage } from 'app/constants/firebaseConfig';
import { IStorage } from 'app/types/IFirestoreData';
import fetchLocalPhoto from 'app/utils/fetchLocalPhoto';
import getFilename from 'app/utils/getFilename';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default async function uploadImage(
  uri: string,
  userId: string,
  collection: IStorage,
) {
  const file = await fetchLocalPhoto(uri);
  const filename = getFilename(uri);
  const imageRef = ref(storage, `${collection}/${userId}/${filename}`);
  try {
    const uploadTask = await uploadBytesResumable(imageRef, file);

    if (uploadTask.state === 'success') {
      const url = await getDownloadURL(imageRef);
      return { status: true, result: url };
    } else {
      return { status: false, result: '' };
    }
  } catch (error: any) {
    return { status: false, result: error };
  }
}
