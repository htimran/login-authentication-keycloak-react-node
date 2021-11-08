import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getUser } from '../../Utils/router';
import '../../Utils/commonStyles.css';

const MainScreen = () => {

  const [isUserAvailable, setUserAvailable] = useState(undefined);
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    getUser(setUserAvailable);
  }, []);

  useEffect(() => {
    if (isUserAvailable) {
      setUserAuthenticated(true);
    } else if (isUserAvailable === false) {
      setUserAuthenticated(false);
    }
  }, [isUserAvailable]);

  return (<div>
    {isUserAuthenticated ?
      <Redirect to="/dashboard" />
      :
      <div>
        <span>Logged Out! Please Log in again</span>
        <Link to="/sign-in">Sign In </Link>
      </div>}
  </div>)
}

export default MainScreen;