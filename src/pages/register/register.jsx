import React, {useState} from "react";
import styles from "./register.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {sendRegister} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

export function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.userData);

    const [form, setForm] = useState({
        email: "",
        password: "",
        name: ""
    })
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendRegister(form, history))
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className="container">
            <div className={styles.login__container}>
                <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
                <form className="form" action="">
                    <div className="form__item mb-6">
                        <Input
                            placeholder="Имя"
                            error={false}
                            name={"name"}
                            onChange={handleChange}
                            errorText={'Ошибка какая то'}
                            size={"default"}
                            type={"text"}
                            value={form.name}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <Input
                            placeholder="E-mail"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            onChange={handleChange}
                            value={form.email}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <PasswordInput
                            size={"default"}
                            placeholder="Пароль"
                            error={false}
                            errorText={"Ошибка какая то"}
                            name={"password"}
                            onChange={handleChange}
                            value={form.password}
                        />
                    </div>
                    <div className={`${styles.form__button} mb-20`}>
                        <Button type={"primary"} size="medium" onClick={handleSubmit}>Зарегестрироваться</Button>
                    </div>
                </form>
                <div className={styles.login__links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}