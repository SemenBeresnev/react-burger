import React from "react";
import styles from "./profile.module.css";
import {ProfileForm} from "../../components/profile-form/profile-form";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {ProfileOrders} from "../../components/profile-orders/profile-orders";
import { TLocationState } from "../../services/types/types";


export function Profile() {
  const { path } = useRouteMatch();
  //Remove this
  const history = useHistory();
  const location = useLocation<TLocationState>();
  let background = history.action === 'PUSH' && location.state && location.state.background;

    return (
      <>
        <div className="container">
          <div className={`${styles.profile__container} pr-5 pl-5`}>
            <ProfileMenu/>
            <div className={`${styles.profile__content}`}>
              <Switch location={background || location}>
                <Route path={`${path}/`} exact={true}>
                  <ProfileForm />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                  <ProfileOrders />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </>
    )
}