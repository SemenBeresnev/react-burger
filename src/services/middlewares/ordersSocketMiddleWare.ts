import { Middleware, MiddlewareAPI } from "redux";
import { orderWsActions } from "../store";

type wsActionsType = typeof orderWsActions;

export const ordersSocketMiddleWare = (wsUrl: string, wsActions: wsActionsType): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (wsInit.match(type)) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  };
};