import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDigs } from '../../store/digs';
import { Link } from "react-router-dom";
// import moment from 'moment';

function UsersDigs() {
  const dispatch = useDispatch();
  const digs = useSelector((state) => state.digs);
  const sessionUser = useSelector((state) => state.session.user);
  const usersDigs = Object.values(digs).filter((dig) => dig.userId === sessionUser.id).reverse();

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  return(
    <>
      <h1>Your Humble Abodes</h1>
      <p>To manage your homes navigate to the individual pages by clicking one of them below.</p>
      {usersDigs && usersDigs.length ? (usersDigs.map(dig => {
        return (
          <Link key={dig.id} to={`/digs/${dig.id}`}>
            <div key={dig.id}>
              <div>IMAGE GOES HERE</div>
              <div>{dig.title}</div>
            </div>
          </Link>
        )
      })) : <h3>You currently aren't hosting with us.</h3> }
    </>
  );
}

export default UsersDigs;
