import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AllDigsPage from "./components/Digs/AllDigs";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import Dig from "./components/Digs/Dig";
import NewDigForm from "./components/Digs/NewDigForm";
import EditDigForm from "./components/Digs/EditDigForm";
import UsersBookings from "./components/Bookings/UsersBookings";
import Booking from "./components/Bookings/Booking";
import UsersDigs from "./components/Digs/UsersDigs";
import HostsBookings from "./components/Bookings/HostsBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllDigsPage/>
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/digs">
            <UsersDigs />
          </Route>
          <Route exact path="/digs/new">
            <NewDigForm />
          </Route>
          <Route exact path="/digs/:digId">
            <Dig/>
          </Route>
          <Route exact path="/digs/:digId/edit">
            <EditDigForm />
          </Route>
          <Route exact path="/digs/:digId/bookings">
            <HostsBookings />
          </Route>
          <Route exact path="/bookings">
            <UsersBookings/>
          </Route>
          <Route exact path="/bookings/:bookingId">
            <Booking/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
