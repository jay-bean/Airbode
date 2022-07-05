import './aboutme.css';

function AboutMe() {
  return (
    <div className='about-me-page'>
    <h1 className='about-me-h1'>Jay Hutts</h1>
    <div className='about-me-links'>
      <img className='about-me-img' src='https://avatars.githubusercontent.com/u/46910262?v=4'/>
      <a href="https://github.com/jay-bean"><img className='about-me-git-img' src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png"/></a>
      <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className='about-me-linked-img' src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png"/></a>
    </div>
    <h2>Welcome to my humble Airbode! Thank you for viewing my site!</h2>
    <p className='about-me-p'>This is my first solo project. I put a lot of work into it and I hope you enjoyed it. I learned a lot, debugged even more, and had a lot of fun along the way! Learning React and Redux was a slow start for me, but this project really helped with my understanding. For example, using  reusable components to set the flow of the site, and break it down into smaller pieces. Also, using Redux to ensure my state persisted throughout my whole application. I also got to play with external libraries to add some flare to my site such as react-dates. I was able to leverage their date range picker component for my reservations. One neat thing I was able to do with that component was disabling already booked days. For my backend I used Multer to allow users to upload multiple images at a time. I plan to continue enhancing features and refactor the code base in the future.</p>
    </div>
  );
}

export default AboutMe;
