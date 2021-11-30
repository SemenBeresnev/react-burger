import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
} from "../actions/burger-constructor";
import { initialState, constructorReducer } from "./burger-constructor";

const ingredient0 = {
    ingredient: 0,
    _id: 0,
    uuid: "0"
}

const ingredient1 = {
    ingredients: 1,
    _id: 1,
    uuid: "1"
}

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })
    it('ADD BUN TO CONSTRUCTOR', () => {
        expect(constructorReducer(initialState, { type: ADD_BUN_TO_CONSTRUCTOR, item: ingredient0 })).toEqual(
            { ...initialState, bun: ingredient0 }
        )
    })
    it('ADD INGREDIENT TO CONSTRUCTOR', () => {
        expect(constructorReducer(initialState, { type: ADD_INGREDIENT_TO_CONSTRUCTOR, item: ingredient1 })).toEqual(
            { ...initialState, ingredients: [ingredient1] }
        )
    })
    it('REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
        expect(constructorReducer({ ...initialState, ingredients: [ingredient0, ingredient1] }, { type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, id: "1" })).toEqual(
            { ...initialState, ingredients: [ingredient0] }
        )
    })
    it('MOVE_INGREDIENT_TO_CONSTRUCTOR', () => {
        expect(constructorReducer({ ...initialState, ingredients: [ingredient0, ingredient1] }, { type: MOVE_INGREDIENT_IN_CONSTRUCTOR, dragIndex: 0, hoverIndex: 1 })).toEqual(
            { ...initialState, ingredients: [ingredient1, ingredient0] }
        )
    })
    it('CLEAR CONSTRUCTOR', () => {
        expect(constructorReducer({ ...initialState, ingredients: [ingredient0, ingredient1] }, { type: CLEAR_CONSTRUCTOR })).toEqual(
            initialState
        )
    })
})