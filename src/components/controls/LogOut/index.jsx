import React from 'react';
import firebase from '../../../dataBase/firebase';
import s from './style.styl';

const LogOut = () => <button className={s.signOut} onClick={() => firebase.signOut()}>Sign out</button>;

export default LogOut;