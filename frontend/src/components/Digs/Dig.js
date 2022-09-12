import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs, removeDig } from '../../store/digs';
import BookingForm from '../Bookings/BookingForm';
import ReviewModal from '../Reviews/ReviewModal';
import './dig.css';
import GridGallery from '../GridGallery/GridGallery';
import { getUsers } from '../../store/users';

function Dig() {
  const history = useHistory();
  const { digId } = useParams();
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState([]);

  let owner;
  if (dig && users && users.length) {
    owner = users.find(user => user.id === dig.userId);
  }

  useEffect(() => {
    dispatch(getDigs())
    dispatch(getUsers())
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
                <button className='leading-photo-btn'><span className='square-dots'></span> Show all photos</button>
              </div>
              <div className='hosted-by-div'>
                {owner && <h2 className='hosted-by'>Entire home hosted by {owner.username}</h2>}
                <p className='hosted-by-p'>{dig.guests === 1 ? <span>{dig.guests} guest</span> : <span>{dig.guests} guests</span>}﹒{dig.bedrooms === 1 ? <span>{dig.bedrooms} bedroom</span> : <span>{dig.bedrooms} bedrooms</span>}﹒{dig.beds === 1 ? <span>{dig.beds} bed</span> : <span>{dig.beds} beds</span>}﹒{dig.baths === 1 ? <span>{dig.baths} bath</span> : <span>{dig.baths} baths</span>}</p>
              </div>
            {/* <li className='dig-li' id='dig-gallery'>
              {dig.images && dig.images.length ? <GridGallery images={dig.images}/> : null}
            </li> */}
            <li className='dig-flex-box'>

              <div className='dig-flex-left'>
                <li className='dig-li'>
                  <div>${dig.price}/night</div>
                </li>
                <li className='dig-li'>
                  <div>{dig.pets ? 'Pets are welcomed.' : 'Pets are not allowed at this time.'}</div>
                </li>
                <li className='dig-li' id='dig-description'>
                  <div>{dig.description}</div>
                </li>
              </div>
              <div className='dig-flex-right'>
                  {dig && !sessionUser && (<BookingForm price={dig.price}/>)}
              </div>
            </li>
                <div className='grid-dig-btns'>
                  {dig && sessionUser && dig.userId === sessionUser.id ? <Link to={`/digs/${dig.id}/edit`}><button className='dig-edit-btn'>Edit</button></Link> : null}
                  {dig && sessionUser && dig.userId === sessionUser.id ? <button className='dig-delete-btn' onClick={deleteHandler}>Delete</button> : null}
                </div>
                <div className='grid-dig-links'>
                  {/* {dig && sessionUser && dig.userId === sessionUser.id ? <Link className='dig-homes-link' to="/digs">View Your Homes</Link> : null} */}
                  {dig && sessionUser && dig.userId === sessionUser.id ? <Link className='dig-bookings-link' to={`/digs/${dig.id}/bookings`}>View Bookings</Link> : null}
                  {dig && sessionUser && dig.userId !== sessionUser.id ? <BookingForm price={dig.price}/> : null}
                </div>
                <ReviewModal/>
          </ul>
        )}
        </div>

    </div>
  );
}

export default Dig;
