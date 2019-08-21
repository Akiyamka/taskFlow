import React from 'react';
import Logo from '../Logo';
import TotalTime from '../../controls/TotalTime';
import style from './style.styl';
import LogOut from 'Controls/LogOut';

const Header = () => (
  <div className={style.header}>
    <Logo />
    <TotalTime />
    <LogOut />
  </div>
);

export default Header;
