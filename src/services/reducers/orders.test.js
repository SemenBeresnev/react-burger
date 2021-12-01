import { ordersReducer, initialState } from "./orders";
import {
    CLEAR_ORDER_NUMBER,
    GET_ORDER_FAILED,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    ORDER_WS_CONNECTION_CLOSED,
    ORDER_WS_CONNECTION_ERROR,
    ORDER_WS_CONNECTION_SUCCESS,
    ORDER_WS_GET_MESSAGE
} from "../actions/orders";

const ordersFake = [
    { ingredient: 0 },
    { ingredient: 1 },
    { ingredient: 2 },
    { ingredient: 3 }
]

describe('orders reducer', () => {
    it('should return the initial state', () => {
        expect(ordersReducer(undefined, {})).toEqual(initialState)
    })
    it('ORDER_WS_CONNECTION_SUCCESS', () => {
        expect(ordersReducer(initialState, { type: ORDER_WS_CONNECTION_SUCCESS })).toEqual(
            { ...initialState, wsConnected: true }
        )
    })
    it('ORDER_WS_CONNECTION_ERROR', () => {
        expect(ordersReducer(initialState, { type: ORDER_WS_CONNECTION_ERROR })).toEqual(
            { ...initialState, wsError: true, wsConnected: false }
        )
    })
    it('ORDER_WS_CONNECTION_CLOSED', () => {
        expect(ordersReducer(initialState, { type: ORDER_WS_CONNECTION_CLOSED })).toEqual(initialState)
    })
    it('ORDER_WS_CONNECTION_MESSAGE', () => {
        expect(ordersReducer(initialState, { type: ORDER_WS_GET_MESSAGE, payload: { orders: ordersFake, totalToday: 10, total: 10 } })).toEqual(
            { ...initialState, orders: ordersFake, total: 10, totalToday: 10 }
        )
    })
    it('GET_ORDER_FAILED', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_FAILED })).toEqual(
            { ...initialState, orderFailed: true }
        )
    })
    it('GET_ORDER_REQUEST', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual(
            { ...initialState, orderRequest: true }
        )
    })
    it('GET_ORDER_SUCCESS', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_SUCCESS, orders: { fake: 123 } })).toEqual(
            { ...initialState, orderFailed: false, orderRequest: false, orders: { fake: 123 } }
        )
    })

    it('GET_ORDER_NUMBER_REQUEST', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_REQUEST })).toEqual(
            { ...initialState, orderNumberRequest: true }
        )
    })

    it('GET_ORDER_NUMBER_FAILED', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual(
            { ...initialState, orderNumberFailed: true }
        )
    })
    it('GET_ORDER_NUMBER_SUCCESS', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_SUCCESS, payload: 123 })).toEqual(
            { ...initialState, orderNumber: 123 }
        )
    })
    it('CLEAR_ORDER_NUMBER', () => {
        expect(ordersReducer({ ...initialState, orderNumber: 123 }, { type: CLEAR_ORDER_NUMBER })).toEqual(initialState)
    })
})