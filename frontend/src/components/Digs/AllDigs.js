import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DigList from './DigList';
import { getDigs } from '../../store/digs';
import './dig-list.css';

function AllDigsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch]);

  return (
    <DigList />
  );
}

export default AllDigsPage;
