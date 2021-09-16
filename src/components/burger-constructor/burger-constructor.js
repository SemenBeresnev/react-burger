import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import dataPropTypes from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  }
  
  return (
    <>
      <div className={`${burgerConstructorStyles.constructor} mt-25`}>
        <ul className={`${burgerConstructorStyles.list}`}>
          <li className={burgerConstructorStyles.item}>
            <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={1255} thumbnail='https://code.s3.yandex.net/react/code/bun-02.png' />
          </li>
          <li className={burgerConstructorStyles.item}>
            <ul className={`${burgerConstructorStyles.list_scroll} custom-scroll`} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end" }}>
              {props.ingredients.map((ingredient, item) => {
                  if(ingredient.type !== 'bun') {
                    return (<li className={burgerConstructorStyles.item} key={item} _id={ingredient._id}>
                      <div className="mr-2">
                          <DragIcon type={"primary"} />
                      </div>
                      <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
                  </li>)
                  }
                }
              )}
            </ul>
          </li>
          <li className={burgerConstructorStyles.item}>
            <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={1255} thumbnail='https://code.s3.yandex.net/react/code/bun-02.png' />
          </li>
        </ul>
        <div className={`${burgerConstructorStyles.order} mr-8`}>
          <div className={`${burgerConstructorStyles.total_amount} mr-10`}>
            <span className="text text_type_digits-medium">610</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
        </div>
      </div>
      {modalIsOpen && <Modal onClose={handleOpenModal}>
          <OrderDetails />
        </Modal>
      }
    </>

    );
}

BurgerConstructor.propTypes = {ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired}


export default BurgerConstructor;
