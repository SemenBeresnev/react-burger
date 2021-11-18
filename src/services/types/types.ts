import { Location } from 'history';
import store from "../store";
import { ThunkAction } from 'redux-thunk';
import { TUserActions } from "./user";
import { TBurgerIngredientsActions } from "./burger-ingerdients";
import { TConstructorActions } from "./burger-constructor";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { TOrdersActions } from "./orders";
import { rootReducer } from "../reducers";


export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v?: number;
    _id: string;
    index: number;
}


export type TLocationState = {
    background?: Location;
    state?: Location;
    location: Location;
}

export type TConstructorIngredient = TIngredient & {
    onOpen: () => {},
    uuid: string;
}

export type TConstructorItemIngredient = TIngredient & {
    uuid: string;
}

export type TMoveCards = {
    dragIndex: number,
    hoverIndex: number
}

export type TIngredientDetailParams = {
    id: string
}

export type TFormData = {
    name: string,
    email: string,
    password: string
}

export type TResetPasswordForm = Pick<TFormData, 'password'> & {
    token: string
}

export type TLoginForm = Omit<TFormData, 'name'>

export type TUser = {
    email: string;
    name: string;
}

type TApplicationActions = TUserActions | TBurgerIngredientsActions | TConstructorActions | TOrdersActions;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
>

export type AppDispatch = <TReturnType>(action: TApplicationActions | AppThunk | undefined) => TReturnType;
export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export type RootState = ReturnType<typeof rootReducer>;
