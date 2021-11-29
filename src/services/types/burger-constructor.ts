import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from "../actions/burger-constructor";

import {TConstructorIngredient} from "./types";

export type TAddIngredientToConstructorAction = {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly item: TConstructorIngredient;
}

export type TAddBunToConstructorAction = {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly item: TConstructorIngredient
}

export type TRemoveIngredientFromConstructorAction = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly id: string;
}

export type TMoveIngredientInConstructorAction = {
  readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TClearConstructorAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  TAddIngredientToConstructorAction |
  TRemoveIngredientFromConstructorAction |
  TMoveIngredientInConstructorAction |
  TClearConstructorAction |
  TAddBunToConstructorAction;