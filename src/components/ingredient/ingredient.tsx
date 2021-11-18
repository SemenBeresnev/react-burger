import React, {SyntheticEvent} from 'react';
import {Link, useLocation} from "react-router-dom";
import ingredientStyle from './ingredient.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import {TIngredient} from "../../utils/types";
import { useSelector } from '../../services/types/types';

type TIngredientProps = {
    image: string;
    price: number;
    name: string;
    _id: string;
    type: string;
}

const Ingredient: React.FC<TIngredientProps> = (props) => {
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const {image, price, name, _id, type} = props;
    let ingredientsCount = ingredients.filter((item: TIngredient) => item._id === _id).length;
    let counter;
    const location = useLocation();

    if (type === 'bun' && bun && bun._id === _id) {
        counter = 2;
    } else if (type !== 'bun' && ingredientsCount) {
        counter = ingredientsCount
    } else {
        counter = '';
    }

    const [{opacity}, ref] = useDrag({
        type: 'ingredients',
        item: {...props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
      <Link
          to={{pathname: `/ingredients/${_id}`, state: {background: location}}}
          ref={ref}
          draggable
          className={`${ingredientStyle.product}`}
          style={{opacity: opacity}}
          id={_id} >
        {counter && <Counter count={Number(counter)}/>}
        <img className={`${ingredientStyle.image} pr-4 pl-4`} src={image} alt=""/>
        <div className={`${ingredientStyle.price} mt-1 mb-1`}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${ingredientStyle.name} text text_type_main-default mt-1 mb-10`}>{name}</p>
      </Link>
    )
}

/*
Ingredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}*/
export default Ingredient;