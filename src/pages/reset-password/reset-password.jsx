import React, {useState} from "react";
import resetStyles from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {DELETE_WAS_ON_FORGOT_PAGE, sendResetPassword} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

export function ResetPassword() {
    const history = useHistory();

    const {wasOnForgotPass, isAuth} = useSelector(state => state.userData);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        password: "",
        token: ""
    })

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSendForm = (e) => {
        e.preventDefault();
        dispatch(sendResetPassword(form, history));
        dispatch({type: DELETE_WAS_ON_FORGOT_PAGE})
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    if (!wasOnForgotPass) {
        return (<Redirect to={'/forgot-password'}/>)
    }

    return (
        <div className="container">
            <div className={resetStyles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            type={"password"}
                            icon={"ShowIcon"}
                            size={"default"}
                            placeholder="Введите новый пароль"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"password"}
                            onChange={onChange}
                            value={form.password}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <Input
                            type={"text"}
                            size={"default"}
                            placeholder="Введите код из письма"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"token"}
                            onChange={onChange}
                            value={form.token}
                        />
                    </div>
                    <div className={`${resetStyles.form__button} mb-20`}>
                        <Button type={"primary"} onClick={onSendForm} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={resetStyles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}