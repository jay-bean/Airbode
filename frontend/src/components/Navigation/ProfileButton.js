import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './profile.css';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      {!showMenu && <button className="profile-btn" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>}
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-li-name">{user.username}</li>
          <Link className="profile-link" to='/bookings'><li className="profile-li">Trips</li></Link>
          <Link className="profile-link" to='/digs'><li className="profile-li">Homes</li></Link>
          <Link className="profile-link" to='/reviews'><li className="profile-li">Reviews</li></Link>
          <li className="profile-li">
            <button className="profile-logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
