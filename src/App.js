import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'

function App() {
  return (
    <>
      <AppHeader />
      <main style={{ display: 'flex', flexDirection: 'row', maxWidth: 1360, margin: 'auto' }}>
        <BurgerConstructor />
        <BurgerIngredients />
      </main>
    </>
  );
}

export default App;
