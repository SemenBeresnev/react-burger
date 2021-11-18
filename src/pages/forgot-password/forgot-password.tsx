import React, {useState, ChangeEvent, FormEvent} from "react";
import styles from "./forgot-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendForgotPassword, SET_WAS_ON_FORGOT_PAGE} from "../../services/actions/user";

export function ForgotPassword() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth}: any = useSelector<any>(state => state.userData);

    const [email, setEmail] = useState<string>("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onSendForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch({
            type: SET_WAS_ON_FORGOT_PAGE
        })
        dispatch(sendForgotPassword(email, history));
    }
    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }
    return (
        <div className="container">
            <div className={styles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form className="form" action="" onSubmit={onSendForm}>
                    <div className="form__item mb-6">
                        <Input
                            placeholder="Укажите E-mail"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className={`${styles.form__button} mb-20`}>
                        
                        <Button type={"primary"} size="medium">Восстановить</Button>
                    </div>
                </form>
                <div className={styles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспомнили пароль? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}