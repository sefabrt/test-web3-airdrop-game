// firestoreHelpers.ts
import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const createUserIfNotExists = async (username: string) => {
  const userDoc = doc(db, "users", username);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    await setDoc(userDoc, { coins: 0 });
  }
};

export const updateUserCoins = async (username: string, coins: number) => {
  const userDoc = doc(db, "users", username);
  await updateDoc(userDoc, { coins });
};

export const getUserCoins = async (username: string) => {
  const userDoc = doc(db, "users", username);
  const userSnapshot = await getDoc(userDoc);
  
  if (userSnapshot.exists()) {
    return userSnapshot.data()?.coins || 0;
  } else {
    return 0;
  }
};
