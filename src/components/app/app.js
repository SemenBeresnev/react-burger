import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import appStyles from './app.module.css'


function App() {

  return (
    <>
      <AppHeader />
      <main>
        <div className={`${appStyles.container} pl-5 pr-5`}>
            <div className={appStyles.burger_cont}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
        </div>
      </main>  
    </>
  );
}

export default App;