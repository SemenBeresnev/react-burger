import React from 'react';
import {NavLink, useRouteMatch, Link} from "react-router-dom";
import { useSelector } from '../../services/types/types';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
  const {isAuth} = useSelector(state => state.userData);
  //const isAuth = false;
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');
  const isLogin = !!useRouteMatch('/login');
  const isIngredient = !!useRouteMatch({path: '/ingredients/:id'})
  return (
    <div className={appHeaderStyles.body__container}>
      <div className={appHeaderStyles.appbar}>
        <div className={appHeaderStyles.container__buttons}>
          <div className={appHeaderStyles.container__button}>
            <NavLink exact={true} to={"/"} activeClassName={appHeaderStyles.nav__linkActive}  
                className={`${appHeaderStyles.nav__link} ${isIngredient && appHeaderStyles.nav__linkActive} text text_type_main-default`}>
              <BurgerIcon type={(isConstructor || isIngredient) ? "primary" : "secondary"} /><p>Конструктор</p>
            </NavLink>
          </div>
          <div className={appHeaderStyles.container__button}>
            <NavLink to={"/feed"} activeClassName={appHeaderStyles.nav__linkActive}  className={`${appHeaderStyles.nav__link} text text_type_main-default`}>
              <ListIcon type={isFeed ? "primary" : "secondary"} /><p>Лента заказов</p>
            </NavLink>
          </div>
        </div>
        <Link to="/">
          <Logo />
        </Link>
        <div className={appHeaderStyles.container__button}>
          {isAuth ? (
            <NavLink to={"/profile"} activeClassName={appHeaderStyles.nav__linkActive} className={`${appHeaderStyles.profile} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type={isProfile ? "primary" : "secondary"} /><span>Личный кабинет (уже есть)</span>
            </NavLink>
          ) : (
            <NavLink to={"/login"} activeClassName={appHeaderStyles.nav__linkActive} className={`${appHeaderStyles.profile} text text_type_main-default pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type={isLogin ? "primary" : "secondary"} /><span>Личный кабинет (создать)</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppHeader;



