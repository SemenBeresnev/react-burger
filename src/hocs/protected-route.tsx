import { Redirect, Route } from 'react-router-dom';

import PropTypes from "prop-types";
import { useSelector } from '../services/types/types';

type TProtectedRouteProps = {
    exact?: boolean;
    path: string;
}

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, exact, path }) => {
   const {isAuth} = useSelector(state => state.userData);
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
/*
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired
}*/
