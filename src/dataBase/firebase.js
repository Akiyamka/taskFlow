import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCpGwibkYz3Rfc3F94V5a7Ls9b1N1tUWzw',
  authDomain: 'taskflow-6a51f.firebaseapp.com',
  databaseURL: 'https://taskflow-6a51f.firebaseio.com',
  projectId: 'taskflow-6a51f',
  storageBucket: 'taskflow-6a51f.appspot.com',
  messagingSenderId: '350776321817',
  appId: '1:350776321817:web:8711f05ea7805e6a',
};
const fb = firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const firestore = (collection) => firebase.firestore().collection(collection);
export default {
  auth: () => fb.auth().signInWithPopup(provider),
  signOut: () => fb.auth().signOut(),
  put: (id, items, collection) =>
    firestore(collection)
      .doc(id)
      .update(items),
  add: (id, items, collection) =>
    firestore(collection)
      .doc(id)
      .set(items),
  delete: (id, collection) =>
    firestore(collection)
      .doc(id)
      .delete(),
  getTasks: (collection) => firestore(collection).get(),
  provider,
  firebase,
  fb,
};
