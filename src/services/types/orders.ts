import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
  ORDER_WS_CONNECTION_CLOSED,
  ORDER_WS_CONNECTION_ERROR,
  ORDER_WS_CONNECTION_SUCCESS,
  ORDER_WS_GET_MESSAGE,
  CLEAR_ORDER, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, GET_ORDER_NUMBER_FAILED, CLEAR_ORDER_NUMBER, ORDER_WS_CONNECTION_START
} from "../actions/orders";
import { TFeedItem } from "./user";

export type TOrdersWsConnectionStartAction = {
  readonly type: typeof ORDER_WS_CONNECTION_START;
}

export type TOrdersWsConnectionSuccessAction = {
  readonly type: typeof ORDER_WS_CONNECTION_SUCCESS;
}

export type TOrdersWsConnectionErrorAction = {
  readonly type: typeof ORDER_WS_CONNECTION_ERROR;
}

export type TOrdersWsConnectionClosedAction = {
  readonly type: typeof ORDER_WS_CONNECTION_CLOSED;
}

export type TOrdersWsGetMessageAction = {
  readonly type: typeof ORDER_WS_GET_MESSAGE;
  readonly payload: {
    orders: TFeedItem[],
    total: number,
    totalToday: number
  }
}

export type TGetOrderNumberRequestAction = {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export type TGetOrderNumberFailedAction = {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export type TGetOrderNumberSuccessAction = {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly payload: string;
}

export type TClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
}

export type TClearOrderNumberAction = {
  readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
}

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orders: TFeedItem[];
}

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrdersActions =
  TOrdersWsConnectionSuccessAction |
  TOrdersWsConnectionErrorAction |
  TOrdersWsConnectionClosedAction |
  TOrdersWsGetMessageAction |
  TGetOrderNumberRequestAction |
  TGetOrderNumberFailedAction |
  TGetOrderNumberSuccessAction |
  TClearOrderAction |
  TGetOrderRequestAction |
  TGetOrderSuccessAction |
  TGetOrderFailedAction |
  TClearOrderNumberAction |
  TOrdersWsConnectionStartAction;