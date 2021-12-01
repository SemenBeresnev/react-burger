import { AppDispatch, AppThunk } from "../types/types";
import { apiURL } from "../../utils/constants";
import { Dispatch } from "react";
import { getCookie } from "../../utils/funcs";
import { postOrderUser } from "../../utils/api";

export const ORDER_WS_CONNECTION_SUCCESS: 'ORDER_WS_CONNECTION_SUCCESS' = 'ORDER_WS_CONNECTION_SUCCESS';
export const ORDER_WS_CONNECTION_ERROR: 'ORDER_WS_CONNECTION_ERROR' = 'ORDER_WS_CONNECTION_ERROR';
export const ORDER_WS_CONNECTION_CLOSED: 'ORDER_WS_CONNECTION_CLOSED' = 'ORDER_WS_CONNECTION_CLOSED';
export const ORDER_WS_GET_MESSAGE: 'ORDER_WS_GET_MESSAGE' = 'ORDER_WS_GET_MESSAGE';
export const ORDER_WS_CONNECTION_START: 'ORDER_WS_CONNECTION_START' = 'ORDER_WS_CONNECTION_START';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER' = 'CLEAR_ORDER_NUMBER';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

export const orderWsConnectionStart = (url: string) => {
  return {
    type: ORDER_WS_CONNECTION_START,
    payload: url
  }
}

export const orderWsConnectionSuccess = () => {
  return {
    type: ORDER_WS_CONNECTION_SUCCESS,
  }
}

export const orderWsConnectionError = () => {
  return {
    type: ORDER_WS_CONNECTION_ERROR,
    wsError: true
  }
}

export const orderWsConnectionClosed = () => {
  return {
    type: ORDER_WS_CONNECTION_CLOSED
  }
}

export const orderWsGetMessage = (message: any) => {
  return {
    type: ORDER_WS_GET_MESSAGE,
    payload: message
  }
}

export const getOrder = (orderId: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    fetch(`${apiURL}/orders/${orderId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Cannot get data from API. Status code: ${res.status}`);
      })
      .then(data => {
        if (data && data.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orders: data.orders,
          })
        } else {
          dispatch({ type: GET_ORDER_FAILED })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: GET_ORDER_FAILED })
      })
  }
}

export const postOrder = (idsArr: string[]): AppThunk => {
  const accessToken = getCookie('token');
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    })
    await postOrderUser(idsArr)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: res.order.number
          })
        } else {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED
          })
        }
      }
      )
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
        dispatch({
          type: CLEAR_ORDER
        })
      })
  }
}


export type TOrdersThunkActions = ReturnType<typeof postOrder> | ReturnType<typeof getOrder>