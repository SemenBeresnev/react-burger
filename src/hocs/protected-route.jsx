import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, exact, path }) {
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

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired
}
