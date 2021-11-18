import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  SET_INGREDIENT_TO_MODAL,
  REMOVE_INGREDIENT_FROM_MODAL
} from "../actions/burger-ingredients";

import {TIngredient} from "./types";

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TSetIngredientToModal = {
  readonly type: typeof SET_INGREDIENT_TO_MODAL;
  readonly item: TIngredient;
}

export type TRemoveIngredientFromModal = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_MODAL;
}

export type TBurgerIngredientsActions =
  TGetIngredientsRequestAction |
  TGetIngredientsSuccessAction |
  TGetIngredientsFailedAction |
  TSetIngredientToModal |
  TRemoveIngredientFromModal;