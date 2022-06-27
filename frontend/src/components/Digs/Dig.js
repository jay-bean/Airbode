import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs } from '../../store/digs';

function Dig() {
  const { digId } = useParams();
  console.log(digId,'this is the dig IDDDD');
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);
  console.log(dig, 'this is the dig i need');

  useEffect(() => {
    dispatch(getDigs())
  }, [digId]);

  return (
    <>
      {dig && (
        <ul>
          <li>
            <div>{dig.name}</div>
            <div>{dig.address}</div>
            <div>{dig.city}</div>
            <div>{dig.state}</div>
            <div>{dig.country}</div>
            <div>{dig.price}</div>
          </li>
        </ul>
      )}
      {/* {dig.userId === sessionUser.id ? <Link to="/digs/:digId/edit"><button>Edit</button></Link> : null} */}

    </>
  );
}

export default Dig;
