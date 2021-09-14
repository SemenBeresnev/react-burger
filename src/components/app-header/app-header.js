import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export default class AppHeader extends React.Component {
  render() {
    return (
      <>
        <div className={appHeaderStyles.body__container}>
          <div className={appHeaderStyles.appbar}>
            <div className={appHeaderStyles.container__buttons}>
              <div className={appHeaderStyles.container__button}>
                <BurgerIcon type="primary" />
                <h className={appHeaderStyles.title__button}>Конструктор</h>
              </div>
              <div className={appHeaderStyles.container__button}>
                <ProfileIcon type="primary" className={appHeaderStyles.icons} />
                <h className={appHeaderStyles.title__button}>Личный кабинет</h>
              </div>
            </div>
            <Logo />
            <div className={appHeaderStyles.container__button}>
              <ListIcon type='primary' />
              <h className={appHeaderStyles.title__button}>Личный кабинет</h>
            </div>
          </div>
        </div>
      </>
    );
  }
}
