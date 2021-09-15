import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import dataPropTypes from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('but');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  const handleTabClick = (value) => {
    setCurrent(value);
  }

  const handleOpenModal = (e) => {
      const id = e.currentTarget.getAttribute('_id');
      setModalData(props.ingredients.find((item) => item._id === id));
      setModalIsOpen(true);
  }
  
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }
  return (
    <>
      <div className={burgerIngredientsStyles.constructor}>
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <div style={{ display: 'flex' }} className='mt-5'>
          <a href="#buts">
            <Tab value="but" active={current === 'but'} onClick={handleTabClick}>
              Булка
            </Tab>
          </a>
          <a href="#sauces">
            <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
              Соусы
            </Tab>
          </a>
          <a href="#mains">
            <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
              Начинки
            </Tab>
          </a>
        </div>
        <div className={`${burgerIngredientsStyles.articles}  custom-scroll mt-10`}>
          <h3 className="text text_type_main-medium" id="buts">Булки</h3>
          <div className={burgerIngredientsStyles.articles_container}>
            {props.ingredients.filter((ingr) => ingr.type === 'bun').map((ingr) => {
              return(
                <div className={burgerIngredientsStyles.article} onClick={handleOpenModal} _id={ingr._id} key={ingr._id}>
                  <img className={`${burgerIngredientsStyles.image} pr-4 pl-4`} src={ingr.image} alt=""/>
                  <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{ingr.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${burgerIngredientsStyles.article_name} text text_type_main-default mt-1 mb-10`}>{ingr.name}</p>
                </div>
              )
            })}
          </div>
          <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
          <div className={burgerIngredientsStyles.articles_container}>
          {props.ingredients.filter((ingr) => ingr.type === 'sauce').map((ingr) => {
              return(
                <div className={burgerIngredientsStyles.article} onClick={handleOpenModal} _id={ingr._id} key={ingr._id}>
                  <img className={`${burgerIngredientsStyles.image} pr-4 pl-4`} src={ingr.image} alt=""/>
                  <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{ingr.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${burgerIngredientsStyles.article_name} text text_type_main-default mt-1 mb-10`}>{ingr.name}</p>
                </div>
              )
            })}
          </div>
          <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
            <div className={burgerIngredientsStyles.articles_container}>
            {props.ingredients.filter((ingr) => ingr.type === 'main').map((ingr) => {
              return(
                <div className={burgerIngredientsStyles.article} onClick={handleOpenModal} _id={ingr._id} key={ingr._id}>
                  <img className={`${burgerIngredientsStyles.image} pr-4 pl-4`} src={ingr.image} alt=""/>
                  <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{ingr.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${burgerIngredientsStyles.article_name} text text_type_main-default mt-1 mb-10`}>{ingr.name}</p>
                </div>
              )
            })}
            </div>
          </div>
        </div>
        {modalIsOpen && modalData && (
          <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
            <IngredientDetails data={modalData} />
          </Modal>)
        }
      </>
    );

}
BurgerIngredients.propTypes = {ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired}

export default BurgerIngredients;
