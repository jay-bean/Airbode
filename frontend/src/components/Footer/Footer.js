import './footer.css';

function Footer({ isLoaded }) {
  return (
    isLoaded &&
    <div className="footer">
      <div className="footer-inner">
        <a className='footer-git' href="https://github.com/jay-bean">GitHub</a>
        <p className='footer-name'>Jay Hutts</p>
        <a className='footer-linkedin' href="https://www.linkedin.com/in/jay-hutts-300ab9180/">LinkedIn</a>
      </div>
    </div>
  );
}

export default Footer;
