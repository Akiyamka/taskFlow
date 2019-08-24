/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../dataBase/firebase';
import Logo from '../../views/Logo';
import s from './style.styl';

const Login = ({ history }) => {
  const path = process.env.NODE_ENV === 'production';

  const login = () => {
    firebase.auth().then((info) => {
      localStorage.setItem('credential', info.credential.idToken);
      localStorage.setItem('id', info.additionalUserInfo.profile.id);

      history.push(path ? '/taskFlow' : '/');
    });
  };

  return (
    <div className={s.login}>
      <Logo />
      <button type='button' className={s.loginButton} onClick={login}>
        Login
      </button>
    </div>
  );
};

export default withRouter(Login);
