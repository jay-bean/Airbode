import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs, removeDig } from '../../store/digs';
import BookingForm from '../Bookings/BookingForm';
import ReviewModal from '../Reviews/ReviewModal';
import './dig.css';
import GridGallery from '../GridGallery/GridGallery';
import { getUsers } from '../../store/users';
import { getReviews } from '../../store/reviews';
import Review from '../Reviews/Review';

function Dig() {
  const history = useHistory();
  const { digId } = useParams();
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);
  const reviews = useSelector((state) => state.reviews);

  let digsReviews;
  if (dig && reviews) {
    console.log(reviews)
    digsReviews = Object.values(reviews).filter(review => review.digId === dig.id).reverse();
  }

  let owner;
  if (dig && users && users.length) {
    owner = users.find(user => user.id === dig.userId);
  }

  useEffect(() => {
    dispatch(getDigs())
    dispatch(getUsers())
    dispatch(getReviews());
  }, [digId, dispatch]);

  useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/users');
        const resData = await res.json()
        setUsers(resData)
    }
    fetchData()
  }, [])

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await dispatch(removeDig(dig));
      const redirect = await history.push("/");
      return redirect;
    }
  }

  let leadingPhotos;
  if (dig && dig.images && dig.images.length) {
    leadingPhotos = dig.images.slice(0, 5);
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className='dig-ind-page'>
      <div>
        {dig && (
          <ul className='dig-grid'>
              <li className='dig-li'>
                <div className='dig-title'>{dig.title}</div>
              </li>
              <li className='dig-li'>
                <div className='dig-address'>{dig.city}, {dig.state} {dig.country}</div>
              </li>
              {leadingPhotos && leadingPhotos.length ?
                <div className='leading-photo-container'>
                  <div className='leading-photo-div-one'>
                    <img className='leading-photo-img-one' src={leadingPhotos[0].url}/>
                  </div>
                  <div className='leading-photo-div-two'>
                    <img className='leading-photo-img-two' src={leadingPhotos[1].url}/>
                    <img className='leading-photo-img-three' src={leadingPhotos[2].url}/>
                  </div>
                  <div className='leading-photo-div-three'>
                    <img className='leading-photo-img-four' src={leadingPhotos[3].url}/>
                    <img className='leading-photo-img-five' src={leadingPhotos[4].url}/>
                  </div>
                </div>
              : null}
              <div className='leading-btn-div'>
                {dig && dig.images && dig.images.length && <GridGallery images={dig.images}/>}
              </div>
              <div className='hosted-by-div'>
                {owner && <h2 className='hosted-by'>Entire home hosted by {owner.username}</h2>}
                <p className='hosted-by-p'>{dig.guests === 1 ? <span>{dig.guests} guest</span> : <span>{dig.guests} guests</span>}﹒{dig.bedrooms === 1 ? <span>{dig.bedrooms} bedroom</span> : <span>{dig.bedrooms} bedrooms</span>}﹒{dig.beds === 1 ? <span>{dig.beds} bed</span> : <span>{dig.beds} beds</span>}﹒{dig.baths === 1 ? <span>{dig.baths} bath</span> : <span>{dig.baths} baths</span>}</p>
              </div>
            <li className='dig-flex-box'>

              <div className='dig-flex-left'>
                {dig.pets ? <div className='pets-div'><img className='pets-img' src='https://airbodes-bucket.s3.us-west-1.amazonaws.com/708C36F6-DE10-4AD0-9CCA-6475FC62538F_4_5005_c.jpeg'/>Pets are welcomed</div> : <div className='pets-div'><img className='pets-img' src='https://airbodes-bucket.s3.us-west-1.amazonaws.com/5ED411DD-F0BB-438D-9877-6FFE8516D6D4_4_5005_c.jpeg'/>Pets are not allowed at this time</div>}
                <div className='dig-description'>
                  <p className='dig-description-p'>{dig.description}</p>
                </div>
                <div className='dig-sleep'>
                  <h3 className='sleep-h3'>Where you'll sleep</h3>
                  <div className='dig-sleep-div'>
                    <img className='bed-img' src='https://airbodes-bucket.s3.us-west-1.amazonaws.com/AF05805B-3374-43AE-B3B7-825DD58C2D5E_4_5005_c.jpeg'/>
                    {dig.bedrooms === 1 ? <p className='sleep-p'>{dig.bedrooms} bedroom</p> : <p className='sleep-p'>{dig.bedrooms} bedrooms</p>}
                    {dig.beds === 1 ? <p className='sleep-p beds'>{dig.beds} bed</p> : <p className='sleep-p'>{dig.beds} beds</p>}
                  </div>
                </div>
              </div>
              <div className={scrollPosition >= 1000 ? 'dig-flex-right-bottom' : scrollPosition <= 650 ? 'dig-flex-right' : 'dig-flex-right-active'}>
                  {dig ? <BookingForm price={dig.price}/> : null}
              </div>
            </li>
                <div className='grid-dig-btns'>
                  {dig && sessionUser && dig.userId === sessionUser.id ? <Link to={`/digs/${dig.id}/edit`}><button className='dig-edit-btn'>Edit</button></Link> : null}
                  {dig && sessionUser && dig.userId === sessionUser.id ? <button className='dig-delete-btn' onClick={deleteHandler}>Delete</button> : null}
                </div>
                <div className='grid-dig-links'>
                  {dig && sessionUser && dig.userId === sessionUser.id ? <Link className='dig-bookings-link' to={`/digs/${dig.id}/bookings`}>View Bookings</Link> : null}
                </div>
                <div className='review-btn-div'>
                <div className='all-reviews-container'>
                  <div className='review-header'>
                    {digsReviews && digsReviews.length === 1 ? <h3 className='h3-review'>{digsReviews.length} review</h3> : <h3 className='h3-review'>{digsReviews.length} reviews</h3>}
                    <ReviewModal/>
                  </div>
                  {digsReviews && digsReviews.length ?
                    <div>
                      <div className='all-reviews-div'>
                        {digsReviews.map(review => (<Review review={review} key={review.id}/>))}
                      </div>
                    </div>
                    : <p className='no-reviews-p'>There are currently no reviews.</p>}
                </div>
                </div>
          </ul>
        )}
        </div>

    </div>
  );
}

export default Dig;
