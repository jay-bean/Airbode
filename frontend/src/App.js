import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AllDigsPage from "./components/Digs/AllDigs";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import Dig from "./components/Digs/Dig";
import NewDigForm from "./components/Digs/NewDigForm";

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
          <Route exact path="/digs/new">
            <NewDigForm edit={false}/>
          </Route>
          <Route exact path="/digs/edit/:digId">
            <NewDigForm edit={true}/>
          </Route>
          <Route exact path="/digs/:digId">
            <Dig/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
