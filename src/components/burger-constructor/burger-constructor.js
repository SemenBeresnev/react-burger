import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';


function BurgerConstructor(props) {
  const [current, setCurrent] = React.useState('bun');


  return (
    <>
      <div className={`${burgerConstructorStyles.body__const} ml-1`}>
        <h1 className={`${burgerConstructorStyles.div} text text_type_main-large mt-5`}>Соберите бургер</h1>
        <div className={`${burgerConstructorStyles.container__tabs} mt-5`}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={burgerConstructorStyles.scrollcontainer}>
          <div className="mt-10">
            <h className="text text_type_main-medium">Булки</h>
          </div>
          {/* {props.ingredient.map((dt, index) => (
            if (dt.type == current) {
            <div key={index}> --  Кусочек
              <img src={dt.image}>

            </div>
          }
          ))} */}
        </div>
      </div>
    </>
  );

}

export default BurgerConstructor;
