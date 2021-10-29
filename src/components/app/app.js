import React from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound} from "../../pages";
import {ProtectedRoute} from "../../hocs/protected-route";

function App() {
  const history = useHistory();
  const location = useLocation();
  let background = history.action === 'PUSH' && location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path="/login" exact={true}>
            <Login/>
          </Route>
            <Route path={"/register"} exact={true}>
          <Register/>
            </Route>
          <Route path={"/forgot-password"} exact={true}>
            <ForgotPassword/>
          </Route>
            <Route path={"/reset-password"} exact={true}>
          <ResetPassword/>
            </Route>
          <Route path={"/ingredients/:id"} exact={true}>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path={"/profile"} exact={true}>
            <Profile/>
          </ProtectedRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>  
    </>
  );
}

export default App;