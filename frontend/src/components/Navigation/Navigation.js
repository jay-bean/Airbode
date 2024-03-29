import { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  function getWindowWidth() {
    const {innerWidth: width} = window;
    return {
      width
    };
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className="host-home" to='/digs/new'>Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className='profile-signup-li'>
        <DemoUser/>
        <LoginFormModal />
        <LoginFormModal signupBtn={true}/>
      </div>
    );
  }

  return (
    <>
    <ul className="nav">
      <li className='home-li'>
        <NavLink className="home" exact to="/">Airbode</NavLink>
      </li>
      <li className='about-me-li'>
        <div className='about-me-div'>
          <NavLink className='about-me' exact to="/about">About</NavLink>
          <p className='about-me-line'>|</p>
          <a className='about-me' href='https://github.com/jay-bean'>GitHub</a>
          <p className='about-me-line'>|</p>
          <a className='about-me' href='https://www.linkedin.com/in/jay-hutts-300ab9180/'>LinkedIn</a>
        </div>
      </li>
      <li className='profile-host-li'>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </>
  );
}

export default Navigation;
