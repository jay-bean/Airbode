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
    <div className='users-digs-page'>
      <h1 className='users-digs-h1'>Your Humble Abodes</h1>
      <p>To manage your homes navigate to the individual pages by clicking one of them below.</p>
      <ul className='users-digs-wrapper'>
        {usersDigs && usersDigs.length ? (usersDigs.map(dig => {
          return (
            <Link className='users-digs-page-link' key={dig.id} to={`/digs/${dig.id}`}>
              <li className='users-digs-grid'>
                {dig.images && dig.images.length ? <img className="users-digs-image" src={`/${dig.images[0].url}`}/> : null}
                <div>{dig.title}</div>
              </li>
            </Link>
          )
        })) : <h3>You currently aren't hosting with us.</h3> }
      </ul>
    </div>
  );
}

export default UsersDigs;
