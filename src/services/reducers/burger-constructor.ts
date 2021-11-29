import { TConstructorIngredient } from "../types/types";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor";
import {TConstructorActions} from "../types/burger-constructor";

type TInitialState = {
    ingredients: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
    totalPrice: number;
}

const initialState: TInitialState = {
    ingredients: [],
    bun: null,

    totalPrice: 0
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TInitialState => {
    switch(action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: action.item,
            }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(({uuid}) => uuid !== action.id)
                ],
            }
        case MOVE_INGREDIENT_IN_CONSTRUCTOR:
            let ingredients = [...state.ingredients];
            const dragCard = ingredients[action.dragIndex];
            ingredients.splice(action.dragIndex, 1);
            ingredients.splice(action.hoverIndex, 0, dragCard)
            return {
                ...state,
                ingredients: ingredients
            }
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [],
                bun: null
            }
        default:
            return state;
    }
}