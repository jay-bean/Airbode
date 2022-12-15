import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DemoUser from '../DemoUser/DemoUser';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './footer.css';

function Footer({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    isLoaded &&
    <div className="footer">
      <div className="footer-inner">
        <div className='footer-section'>
          <div className='about-footer'>
            {sessionUser ?
              <div className='footer-profile-section'>
                <p className='footer-title'>Profile</p>
                <Link className='footer-links' to='/bookings'>Trips</Link>
                <Link className='footer-links' to='/digs'>Homes</Link>
                <Link className='footer-links' to='/reviews'>Reviews</Link>
              </div>
              : <div className='footer-welcome-section'>
                  <p className='footer-title'>Welcome</p>
                  <DemoUser/>
                  <LoginFormModal />
                  <Link className='nav-signup' to="/signup">Sign Up</Link>
                </div>
          }
          </div>
          <div className='about-footer middle-child'>
            <p className='footer-title middle-child-p'>Airbode</p>
            <Link className='footer-links' to='/about'>About</Link>
            <a className='footer-links' href='https://www.jayhutts.dev'>Jay Hutts</a>
            <a className='footer-links' href="https://github.com/jay-bean">GitHub</a>
            <a className='footer-links' href="https://www.linkedin.com/in/jay-hutts-300ab9180/">LinkedIn</a>
          </div>
          <div className='about-footer'>
            <p className='footer-title'>Projects</p>
            <a className='footer-links' href='https://drop-in-skate.herokuapp.com/'>Drop In</a>
            <a className='footer-links' href='https://taskrat.herokuapp.com/'>Task Rat</a>
            <a className='footer-links' href='https://rendering-routes.herokuapp.com/'>Rendering Routes</a>
          </div>
        </div>
        <div className='footer-thanks'>
          <p>2022 Airbode, Inc. | <span className='footer-thanks-p'>Thanks for checking out the site!</span></p>
          <p>
            <a href="https://github.com/jay-bean"><img className='social-img' src='https://airbodes-bucket.s3.us-west-1.amazonaws.com/B86A1F51-E0DC-40CB-BB6C-1F133A180A8C_4_5005_c.jpeg'/></a>
            <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className='social-img' src='https://airbodes-bucket.s3.us-west-1.amazonaws.com/26755702-DDF5-4AAB-9558-ABB907FEF5F9_4_5005_c.jpeg'/></a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
