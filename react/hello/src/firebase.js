import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTUu5BZdLNylxn4aEOyPPfNgG35x43suM",
    authDomain: "onlineprogramming-8150b.firebaseapp.com",
    projectId: "onlineprogramming-8150b",
    storageBucket: "onlineprogramming-8150b.appspot.com",
    messagingSenderId: "564014613305",
    appId: "1:564014613305:web:dc1e5ecf4b18a121c5dee8",
    measurementId: "G-GQFEW94BPQ"
  };
// "***"の部分にコピーしたコードの内容をペーストする。

firebase.initializeApp(firebaseConfig);

export default firebase