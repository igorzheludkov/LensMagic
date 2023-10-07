import { db } from 'app/constants/firebaseConfig';
import { IFirestoreDb } from 'app/types/IFirestoreData';
import { IUser } from 'app/types/IProfile';
import { doc, getDoc } from 'firebase/firestore';

export default async function getProfile(id: string) {
  try {
    const docRef = doc(db, IFirestoreDb.USERS, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return { status: true, result: data as IUser };
  } catch (error: any) {
    return { status: false, result: error };
  }
}
