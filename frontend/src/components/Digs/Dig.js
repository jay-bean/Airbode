import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs, removeDig } from '../../store/digs';
import BookingForm from '../Bookings/BookingForm';
import ReviewModal from '../Reviews/ReviewModal';
import './dig.css';
import GridGallery from '../GridGallery/GridGallery';

function Dig() {
  const history = useHistory();
  const { digId } = useParams();
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs())
  }, [digId, dispatch]);

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
    console.log(leadingPhotos)
  }

  return (
    <div className='dig-ind-page'>
      <div>
        {dig && (
          <ul className='dig-grid'>
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
            {/* <li className='dig-li' id='dig-gallery'>
              {dig.images && dig.images.length ? <GridGallery images={dig.images}/> : null}
            </li> */}

            <div className='dig-grid-left'>
              <li className='dig-li'>
                <div className='dig-title'>{dig.title}</div>
              </li>
              <li className='dig-li'>
                <div>{dig.address}</div>
              </li>
              <li className='dig-li'>
                <div>{dig.city}, {dig.state}</div>
              </li>
              <li className='dig-li'>
                <div>{dig.country}</div>
              </li>
              <li className='dig-li'>
                <div>${dig.price}/night</div>
              </li>
              <li className='dig-li'>
                <div>Guests: {dig.guests}</div>
              </li>
              <li className='dig-li'>
                <div>Bedrooms: {dig.bedrooms}</div>
              </li>
              <li className='dig-li'>
                <div>Beds: {dig.beds}</div>
              </li>
              <li className='dig-li'>
                <div>Baths: {dig.baths}</div>
              </li>
              <li className='dig-li'>
                <div>{dig.pets ? 'Pets are welcomed.' : 'Pets are not allowed at this time.'}</div>
              </li>
              <li className='dig-li' id='dig-description'>
                <div>{dig.description}</div>
              </li>
            </div>
            <div className='grid-dig-right'>
              <div className='grid-dig-btns'>
                <ReviewModal/>
                {dig && sessionUser && dig.userId === sessionUser.id ? <Link to={`/digs/${dig.id}/edit`}><button className='dig-edit-btn'>Edit</button></Link> : null}
                {dig && sessionUser && dig.userId === sessionUser.id ? <button className='dig-delete-btn' onClick={deleteHandler}>Delete</button> : null}
              </div>
              <div className='grid-dig-links'>
                {dig && sessionUser && dig.userId === sessionUser.id ? <Link className='dig-homes-link' to="/digs">View Your Homes</Link> : null}
                {dig && sessionUser && dig.userId === sessionUser.id ? <Link className='dig-bookings-link' to={`/digs/${dig.id}/bookings`}>View Bookings</Link> : null}
                {dig && sessionUser && dig.userId !== sessionUser.id ? <BookingForm price={dig.price}/> : null}
                {dig && !sessionUser && (<BookingForm price={dig.price}/>)}
              </div>
            </div>
          </ul>
        )}
        </div>

    </div>
  );
}

export default Dig;
