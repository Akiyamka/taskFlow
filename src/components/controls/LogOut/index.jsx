import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../dataBase/firebase';
import s from './style.styl';
import db from '../../../dataBase/indexDb';

const LogOut = () => {
  const logOut = () => {
    firebase.signOut();
    localStorage.clear();
    db.clear();
  };

  const path = process.env.NODE_ENV === 'production';

  return (
    <Link to={path ? '/taskFlow/login': '/login'} className={s.link}>
      <button className={s.signOut} onClick={logOut}>
        Sign out
      </button>
    </Link>
  );
};

export default LogOut;
