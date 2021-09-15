import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import appStyles from './App.module.css'

const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  })

  React.useEffect(() => {
    const getIngredients = async () => {
      setState(prevState => ({...prevState, isLoading: true, hasError: false}));
      await fetch(ingredientsUrl)
        .then(res => res.json())
        .then((res) => setState(prevState => ({...prevState, data: res.data, isLoading: false, hasError: false})))
        .catch((error) => {
          console.log(typeof error)
          setState(prevState => ({ ...prevState, hasError: true, isLoading: false, errorMessage: String(error)}));
        });
    }
    getIngredients();
  }, [])

  return (
    <>
      <AppHeader />
      <main>
        <div className={`${appStyles.container} pl-5 pr-5`}>
          {!state.hasError && state.isLoading  && <h1 className={`${appStyles.info_text} text text_type_main-medium text_color_sucess p-8`}>Идет загрузка данных...</h1>}
          {state.hasError && <h1 className={`${appStyles.info_text} text text_type_main-medium text_color_error p-8`}>При загрузке данных произошла ошибка: <br/> {state.errorMessage}</h1>}
          {!state.hasError && !state.isLoading &&
            <div className={appStyles.burger_cont}>
              <BurgerIngredients ingredients={state.data} />
              <BurgerConstructor ingredients={state.data} />
            </div>
          }
        </div>
      </main>  
    </>
  );
}

export default App;