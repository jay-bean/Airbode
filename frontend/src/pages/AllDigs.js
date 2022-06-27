import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DigList from '../components/Digs/DigList';
import { getDigs } from '../store/digs';

function AllDigsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchDigs = async () => {
  //     const data = await fetch('/api/digs');
  //     const digs = await data.json();
  //     console.log(digs);
  //   }
  //   fetchDigs()
  //   .catch(console.error)
  // }, []);

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
