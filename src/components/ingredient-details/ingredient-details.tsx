import React from 'react';
import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ingredientDetailsStyle from './ingredient-details.module.css';
//import dataPropTypes from "../../utils/prop-types";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {TIngredient, TIngredientDetailParams} from "../../utils/types";

function IngredientDetails() {
  const dispatch = useDispatch();
  const {ingredients, ingredientDetails}: any = useSelector<any>(state => state.burgerIngredients);
  const {id} = useParams<TIngredientDetailParams>();
  let ingredient;

  useEffect(() => {
      if (ingredients.length <= 0) {
          dispatch(getIngredients())
      }
  }, [dispatch, ingredients.length]);

  function ingredientDetailsIsEmpty() {
    for (var key in ingredientDetails) {return false;}
    return true;
  }


  if (!ingredientDetailsIsEmpty()) {ingredient = ingredientDetails;
  } else {ingredient = ingredients.find((item: TIngredient) => item._id === id); };

  return (
    <>
      {ingredientDetailsIsEmpty() && (
              <h1 className={`${ingredientDetailsStyle.title}  mt-30 text text_color_primary text_type_main-large`}>Детали ингредиента</h1>
          )}
          {ingredient && (
              <div className={ingredientDetailsStyle.container}>
                  <img src={ingredient?.image_large} alt=""/>
                  <h5 className="text text_type_main-medium mt-4">{ingredient?.name}</h5>
                  <div className={`${ingredientDetailsStyle.flex} mt-8`}>
                      <div className={`${ingredientDetailsStyle.item} mr-5`}>
                          <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                          <span
                              className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.calories}</span>
                      </div>
                      <div className={`${ingredientDetailsStyle.item} mr-5`}>
                          <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                          <span
                              className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.proteins}</span>
                      </div>
                      <div className={`${ingredientDetailsStyle.item} mr-5`}>
                          <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                          <span
                              className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.fat}</span>
                      </div>
                      <div className={`${ingredientDetailsStyle.item} mr-5`}>
                          <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                          <span
                              className="text text_color_inactive text_type_digits-default mt-2">{ingredient?.carbohydrates}</span>
                      </div>
                  </div>
              </div>
          )}
      </>
  )
}

//IngredientDetails.propTypes = {data: dataPropTypes.isRequired};

export default  IngredientDetails;