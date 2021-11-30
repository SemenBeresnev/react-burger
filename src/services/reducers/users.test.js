import { initialState, usersReducer } from "./user";
import {
    CHANGE_USER_INFO,
    DELETE_IS_AUTH, DELETE_WAS_ON_FORGOT_PAGE,
    GET_USER_FAILED,
    GET_USER_INFO,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SET_IS_AUTH, SET_WAS_ON_FORGOT_PAGE
} from "../actions/user";

const user = {
    name: 'Test',
    email: 'Teset@mail.ru',

}

describe('orders reducer', () => {
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(initialState)
    })
    it('should handle GET_USER_SUCCESS', () => {
        expect(usersReducer(initialState, { type: GET_USER_SUCCESS, user: user })).toEqual(
            { ...initialState, authFailed: false, authRequest: false, user: user, isAuth: true }
        )
    })
    it('should handle GET_USER_REQUEST', () => {
        expect(usersReducer(initialState, { type: GET_USER_REQUEST })).toEqual(
            { ...initialState, authFailed: false, authRequest: true }
        )
    })
    it('should handle GET_USER_FAILED', () => {
        expect(usersReducer(initialState, { type: GET_USER_FAILED })).toEqual(
            { ...initialState, authFailed: true, authRequest: false }
        )
    })
    it('should handle GET_USER_INFO', () => {
        expect(usersReducer(initialState, { type: GET_USER_INFO, user: user })).toEqual(
            { ...initialState, user: user }
        )
    })
    it('should handle CHANGE_USER_INFO', () => {
        expect(usersReducer({ ...initialState, user: { name: "Test2", email: "Test2@mail.ru" } }, { type: CHANGE_USER_INFO, payload: { user: user } })).toEqual(
            { ...initialState, user: user }
        )
    })
    it('should handle SET_IS_AUTH', () => {
        expect(usersReducer(initialState, {
            type: SET_IS_AUTH,
            payload: { accessToken: 'sometext', refreshToken: "sometext" }
        })).toEqual(
            { ...initialState, isAuth: true }
        )
    })
    it('should handle DELETE_IS_AUTH', () => {
        expect(usersReducer({ ...initialState, isAuth: true }, { type: DELETE_IS_AUTH })).toEqual(
            { ...initialState, isAuth: false }
        )
    })
    it('should handle SET_WAS_ON_FORGOT_PAGE', () => {
        expect(usersReducer(initialState, { type: SET_WAS_ON_FORGOT_PAGE })).toEqual(
            { ...initialState, wasOnForgotPass: true }
        )
    })
    it('should handle DELETE_WAS_ON_FORGOT_PAGE', () => {
        expect(usersReducer({ ...initialState, wasOnForgotPass: true }, { type: DELETE_WAS_ON_FORGOT_PAGE })).toEqual(
            { ...initialState, wasOnForgotPass: false }
        )
    })
})