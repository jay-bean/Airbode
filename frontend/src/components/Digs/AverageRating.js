import './average-rating.css';

function AverageRating({ dig, reviews }) {
  const digsReviews = Object.values(reviews).filter(review => review.digId === dig.id);

  let count = 0;
  let average;
  if (digsReviews) {
    digsReviews.forEach(review => count += review.rating);
    const res = Math.abs(count / digsReviews.length);
    average = res.toFixed(2);
  }

  return (
    <div className="average-rating-container">
      {digsReviews && digsReviews.length ?
        <div className="average-rating-container">
          <img className="home-stars" src="https://airbodes-bucket.s3.us-west-1.amazonaws.com/7263DF98-7537-43BD-89C6-A183631FB8D8_4_5005_c.jpeg"/>
          <p className="avg-rating-p">{average}</p>
        </div>
      : <div className="average-rating-container">
          <img className="home-stars" src="https://airbodes-bucket.s3.us-west-1.amazonaws.com/7263DF98-7537-43BD-89C6-A183631FB8D8_4_5005_c.jpeg"/>
          <p className="avg-rating-p">New</p>
        </div>}
    </div>
  );
}

export default AverageRating;
