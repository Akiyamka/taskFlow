import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.styl';

const Footer = () => (
  <div className={style.footer}>
    <h3>
      MADE WITH
      <FontAwesomeIcon className={style.footerIcon} icon='heart' />
      IN BELARUS
    </h3>
  </div>
);

export default Footer;
