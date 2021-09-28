import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import appStyles from './App.module.css'
import {useSelector} from "react-redux";

function App() {

  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burgerIngredients);
  
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