import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs, removeDig } from '../../store/digs';

function Dig() {
  const history = useHistory();
  const { digId } = useParams();
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs())
  }, [digId]);

  const deleteHandler = async () => {
      await dispatch(removeDig(dig));
      const redirect = await history.push("/");
      return redirect;
  }

  return (
    <div>
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
      {dig && dig.userId === sessionUser.id ? <Link to={`/digs/edit/${dig.id}`}><button>Edit</button></Link> : null}
      {dig && dig.userId === sessionUser.id ? <button onClick={deleteHandler}>Delete</button> : null}
    </div>
  );
}

export default Dig;
