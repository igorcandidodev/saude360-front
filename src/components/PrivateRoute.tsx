import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserAuthContext } from '../context/userAuth';


const PrivateRoute: React.FC<{ path: string, component: any }> = ({ path, component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(UserAuthContext);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;