import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';


export default class BurgerConstructor extends React.Component {
  render() {
    return (
      <>
        <div className={burgerConstructorStyles.body__const}>
          <h1 className={`${burgerConstructorStyles.div} text text_type_main-default`}>Соберите бургер</h1>
          <div style={{ display: 'flex' }}>
          </div>
        </div>
      </>
    );
  }
}
