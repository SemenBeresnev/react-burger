import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <>
        <div className={burgerIngredientsStyles.body__ing}>
          <h1 className={burgerIngredientsStyles.title__ing}>test</h1>
        </div>
      </>
    );
  }
}
