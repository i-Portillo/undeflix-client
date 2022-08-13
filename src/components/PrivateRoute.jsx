import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { checkAuth } from '../api/index.js';

const PrivateRoute = ({ role, children }) => {

  const [letIn, setLetIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const isLoggedIn = async () => {
      try {
        const res = await checkAuth();
        if (res.status === 200) {
          if (role === 'user' || res.data.user.role === 'admin' || res.data.user.role === role)
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
          children
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