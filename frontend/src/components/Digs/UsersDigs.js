import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDigs } from '../../store/digs';
import { Link } from "react-router-dom";
import './users-digs.css';

function UsersDigs() {
  const dispatch = useDispatch();
  const digs = useSelector((state) => state.digs);
  const sessionUser = useSelector((state) => state.session.user);
  const usersDigs = Object.values(digs).filter((dig) => dig.userId === sessionUser.id).reverse();

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  return(
    <div className="digs-home-page users-digs-page">
      <h1 className='users-digs-h1'>Your Humble Abodes</h1>
      <p className='users-digs-p'>To manage your homes navigate to the individual pages below.</p>
      <ul className='digs-home-page-ul'>
        {usersDigs && usersDigs.length ? (usersDigs.map(dig => {
          return (
            <Link className="dig-home-page-link"key={dig.id} to={`/digs/${dig.id}`}>
            <li className="dig-home-page-li" dig={dig}>
              <div className="dig-home-page-image-div">
                {dig.images && dig.images.length ? <img className="dig-home-page-image" src={`${dig.images[0].url}`}/> : null}
              </div>
              <div className="dig-home-flex">
                <div className="dig-home-div">
                  <div className="dig-home-location">{dig.city}, {dig.state}</div>
                  <div className="dig-home-price"><span className="dig-home-span">${dig.price}</span> night</div>
                </div>
              </div>
            </li>
          </Link>
            // <Link className='users-digs-page-link' key={dig.id} to={`/digs/${dig.id}`}>
            //   <li className='users-digs-grid'>
            //     {dig.images && dig.images.length ? <img className="users-digs-image" src={`${dig.images[0].url}`}/> : null}
            //     <div>{dig.title}</div>
            //   </li>
            // </Link>
          )
        })) : <h3>You currently aren't hosting with us. Get started now! <Link className='users-digs-host-link' to="/digs/new">Host Your Home</Link></h3> }
      </ul>
    </div>
  );
}

export default UsersDigs;
