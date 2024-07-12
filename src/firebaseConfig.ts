// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdSP5bIojZd2Tqk344iAIyIccAvjanpU0",
  authDomain: "test-web3-airdrop-game.firebaseapp.com",
  projectId: "test-web3-airdrop-game",
  storageBucket: "test-web3-airdrop-game.appspot.com",
  messagingSenderId: "286470033842",
  appId: "1:286470033842:web:f979426f45ebd74c6794ab"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
