import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className="host-home" to='/digs/new'>Host your Home</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser/>
        <LoginFormModal />
        <NavLink className='nav-signup' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
    <ul className="nav">
      <li className="nav-bar">
        <NavLink className="home" exact to="/">Airbode</NavLink>
        <NavLink className="about-me" exact to="/about-me">About Me</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    <hr/>
    </>
  );
}

export default Navigation;
