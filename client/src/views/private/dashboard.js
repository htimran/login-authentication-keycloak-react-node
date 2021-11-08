import React, { useEffect, useState } from 'react';
import '../../Utils/commonStyles.css';
import { getUser } from '../../Utils/router';
import { Redirect } from 'react-router-dom';

const MainDashboard = () => {
  const [isUserAvailable, setUserAvailable] = useState(undefined);
  const [isUserAuthenticated, setUserAuthenticated] = useState(true);

  useEffect(() => {
    getUser(setUserAvailable);
  }, []);

  useEffect(() => {
    if(isUserAvailable){
      setUserAuthenticated(true);
    }else if(isUserAvailable === false){
      setUserAuthenticated(false);
    }
  }, [isUserAvailable]);

  return (<div>
    {isUserAuthenticated ? <h1>Dashboard</h1> : <Redirect to="/sign-in"/>}
  </div>)
}

export default MainDashboard;