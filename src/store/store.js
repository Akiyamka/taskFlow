import createStore from 'unistore';
import devtools from 'unistore/devtools';
import firebase from '../dataBase/firebase';

const initialState = {
  edit: [],
  tasks: [],
  timeLine: {
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date().setHours(23, 59, 0, 0),
  },
  resize: {
    isResize: false,
  },
  currentTimeInterval: 0,
  lastIndex: 0,
  notificationTask: {
    id: '',
    notification: false,
  },
};

const store =
  process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));

const getParams = () => {
  const collection = localStorage.getItem('id');
  firebase
    .getTasks(collection)
    .then((querySnapshot) => {
      const tasks = [];
      [...querySnapshot.docs].map((val) => tasks.push({ ...val.data(), id: val.id }));
      store.setState({ tasks, lastIndex: tasks.length });
    })
    .catch(console.log);
};

const auth = () => {
  firebase.auth().then((info) => {
    localStorage.setItem('credential', info.credential.idToken);
    localStorage.setItem('id', info.additionalUserInfo.profile.id);
    getParams();
  });
};

try {
  const tokenId = localStorage.getItem('credential');
  if (tokenId) {
    const credential = firebase.firebase.auth.GoogleAuthProvider.credential(tokenId);
    firebase.fb
      .auth()
      .signInWithCredential(credential)
      .then(getParams)
      .catch(auth);
  } else auth();
} catch (e) {
  console.log(e);
}

export default store;
