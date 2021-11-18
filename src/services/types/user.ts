import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_INFO,
  SET_IS_AUTH,
  SET_WAS_ON_FORGOT_PAGE,
  DELETE_WAS_ON_FORGOT_PAGE,
  DELETE_IS_AUTH,
  CHANGE_USER_INFO,
} from "../actions/user";
import { TUser } from "./types";

export type TUserActions =
  TGetUserFailedAction |
  TGetUserRequestAction |
  TGetUserSuccessAction |
  TGetUserInfoAction |
  TSetIsAuthAction |
  TDeleteIsAuthAction |
  TSetWasOnForgotPageAction |
  TDeleteWasOnForgotPageAction |
  TChangeUserInfoAction

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
}

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export type TGetUserInfoAction = {
  readonly type: typeof GET_USER_INFO;
  readonly user: TUser;
}

export type TSetIsAuthAction = {
  readonly type: typeof SET_IS_AUTH;
  readonly payload: {
    accessToken: string,
    refreshToken: string
  }
}

export type TDeleteIsAuthAction = {
  readonly type: typeof DELETE_IS_AUTH;
}

export type TSetWasOnForgotPageAction = {
  readonly type: typeof SET_WAS_ON_FORGOT_PAGE;
}

export type TDeleteWasOnForgotPageAction = {
  readonly type: typeof DELETE_WAS_ON_FORGOT_PAGE;
}

export type TChangeUserInfoAction = {
  readonly type: typeof CHANGE_USER_INFO;
  readonly payload: {
    user: TUser
  }
}

export type TFeedItem = {
  createdAt: string;
  ingredients: [string];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
  owner?: string;
}