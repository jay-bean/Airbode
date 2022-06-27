import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DigList from './DigList';
import { getDigs } from '../../store/digs';


function AllDigsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>All Digs</h1>
        <DigList/>
      </div>
    </>
  );
}

export default AllDigsPage;
