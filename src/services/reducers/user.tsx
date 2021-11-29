import {
    GET_USER_FAILED,
    GET_USER_INFO,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SET_IS_AUTH,
    DELETE_IS_AUTH,
    SET_WAS_ON_FORGOT_PAGE, DELETE_WAS_ON_FORGOT_PAGE, CHANGE_USER_INFO
} from "../actions/user";
import { setCookie, deleteCookie, getCookie } from "../../utils/funcs";
import { TUserActions } from "../types/user";

type TUsersInitialState = {
    authRequest: boolean;
    authFailed: boolean;
    user: {
        name: string;
        email: string;
    };
    isAuth: boolean;
    wasOnForgotPass: boolean;
}

const initialState: TUsersInitialState = {
    authRequest: false,
    authFailed: false,
    user: {
        name: "",
        email: ""
    },
    isAuth: Boolean(getCookie('token')),
    wasOnForgotPass: false
}

export const usersReducer = (state = initialState, action: TUserActions): TUsersInitialState => {
    switch (action.type) {
        case GET_USER_FAILED:
            return {
                ...state,
                authFailed: true
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                authRequest: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                authRequest: false,
                authFailed: false,
                isAuth: true
            }
        case GET_USER_INFO:
            return {
                ...state,
                user: action.user
            }
        case SET_IS_AUTH:
            setCookie('token', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                isAuth: true,
            }
        case DELETE_IS_AUTH:
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                isAuth: false
            }
        case SET_WAS_ON_FORGOT_PAGE:
            return {
                ...state,
                wasOnForgotPass: true
            }
        case DELETE_WAS_ON_FORGOT_PAGE:
            return {
                ...state,
                wasOnForgotPass: false
            }
        case CHANGE_USER_INFO:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}