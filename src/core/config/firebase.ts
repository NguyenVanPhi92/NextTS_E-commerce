// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"

// const firebaseConfig = {
//   apiKey: "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg",
//   authDomain: "womart-3a686.firebaseapp.com",
//   databaseURL: "https://womart-3a686-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "womart-3a686",
//   storageBucket: "womart-3a686.appspot.com",
//   messagingSenderId: "761325889031",
//   appId: "1:761325889031:web:a95b7a85155033038eeca2",
//   measurementId: "G-Y65TNJYHSL",
// }

const firebaseConfig = {
  apiKey: "AIzaSyCvNunTdRMxUxbxmKP4ycfPXCWQEmjGvLg",
  authDomain: "liosatavan.firebaseapp.com",
  databaseURL: "https://liosatavan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "liosatavan",
  storageBucket: "liosatavan.appspot.com",
  messagingSenderId: "285067756456",
  appId: "1:285067756456:web:1f87493993b8c4c66e939d",
  measurementId: "G-VC6RCX2EVG",
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
authentication.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()
export const db = getDatabase(app)
