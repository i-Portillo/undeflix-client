import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { checkAuth } from '../api/index.js';
import Blocked from '../pages/Blocked.jsx';
import Idle from '../pages/Idle.jsx';

const PrivateRoute = ({ role, children }) => {

  const location = useLocation();

  const [letIn, setLetIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect( () => {
    const isLoggedIn = async () => {
      try {
        const res = await checkAuth();
        if (res.status === 200) {
          setStatus(res.data.user.subscription_status);
          if ((role === 'user' ) || res.data.user.role === 'admin' || res.data.user.role === role)
          setLetIn(true);
        }
        setLoading(false);
      } catch(err) {
        setLoading(false);
      }
    }
    isLoggedIn();
  }, []);

  return (
    <>
    { loading ? (
        <></>
      ) : (
        letIn ? (
          (status === 'Active') ?
            (location.pathname === '/idle' || location.pathname === '/blocked') ?
              <Navigate to='/catalog' />
            :
              children
          :
            (status === 'Idle') ?
              (location.pathname !== '/idle') ?
                <Navigate to='/idle' />
              :
                <Idle />
            :
              (location.pathname !== '/blocked') ?
                <Navigate to='/blocked' />
              :
                <Blocked />
        ) : (
          <Navigate to="/" />
        )
      )
    }
    </>
  )

  // return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;