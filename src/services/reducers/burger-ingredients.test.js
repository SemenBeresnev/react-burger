import { burgerIngredientsReducer, initialState } from '../reducers/burger-ingredients'
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../actions/burger-ingredients";

const result = [{
    "test": 0
}, {
    "test1": 1
}, {
    "test2": 2
}]

describe('burger-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('GET_INGREDIENTS_REQUEST', () => {
        expect(
            burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
        ).toEqual({ ...initialState, ingredientsRequest: true })
    })

    it('GET_INGREDIENTS_FAILED', () => {
        expect(
            burgerIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })
        ).toEqual({ ...initialState, ingredientsError: true })
    })
    it('GET_INGREDIENTS_SUCCESS', () => {
        expect(
            burgerIngredientsReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS, ingredients: result
            })).toEqual({ ...initialState, ingredients: result })
    })
})