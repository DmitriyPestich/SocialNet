import React from 'react';
import s from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <a>Profile</a>
            </div>
            <div className={s.item}>
                <a>Messages</a>
            </div>
            <div className={s.item}>
                <a>Contacts</a>
            </div>
        </nav>
    );
}

export default Navbar;
