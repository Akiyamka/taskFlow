import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../dataBase/firebase';
import s from './style.styl';

const LogOut = () => {
  const logOut = () => {
    firebase.signOut();
    localStorage.clear();
  };

  return (
    <Link to='/login' className={s.link}>
      <button className={s.signOut} onClick={logOut}>
        Sign out
      </button>
    </Link>
  );
};

export default LogOut;
