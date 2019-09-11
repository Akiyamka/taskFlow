import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../../../dataBase/firebase';
import db from '../../../dataBase/indexDb';
import style from './style.styl';

const Menu = ({ history }) => {
    const path = process.env.NODE_ENV === 'production'

    const [state, setState] = useState({
        showMenu: false,
    });

    const closeMenu = (e) => {
        e.preventDefault();
        setState({...state, showMenu: false});
    }

    const openMenu = (e) => {
        e.preventDefault();
        setState({...state, showMenu: true});
    }

    const logOut = (e) => {
        e.preventDefault();
        firebase.signOut();
        db.clear();
        localStorage.clear();
        history.push(path ? '/taskFlow/login': '/login');
    }

    return (
        <dib className = {style.menu}>
            <FontAwesomeIcon icon='bars' className = {style.menuIcon} onClick={openMenu}/>
            {state.showMenu && <div className={style.menuBackground}>
                <div className={style.menuList}>
                    <div className={style.menuHeader}>
                        <FontAwesomeIcon icon='arrow-left' className={style.backIcon} onClick={closeMenu}/> 
                        <p>Menu</p>
                    </div>
                    <div className={style.menuBody} onClick={logOut}>
                        <FontAwesomeIcon icon='power-off' className={style.offIcon}/>
                        <p>Log out</p>
                    </div>
                </div>
            </div>}
        </dib>
    )
}

export default withRouter(Menu);