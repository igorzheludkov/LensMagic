import { db } from 'app/constants/firebaseConfig';
import { IFirestoreDb } from 'app/types/IFirestoreData';
import { IUser } from 'app/types/IProfile';
import { doc, setDoc } from 'firebase/firestore';

export default async function addProfile(data: IUser) {
  try {
    await setDoc(doc(db, IFirestoreDb.USERS, data.id), data);
    return { status: true, result: 'ok' };
  } catch (error) {
    return { status: false, result: error };
  }
}
