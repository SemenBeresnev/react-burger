import React, {useEffect, useState} from "react";
import styles from "./profile-form.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCustomInput} from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, sendUserInfo} from "../../services/actions/user";

export function ProfileForm() {
    const {user} = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [isChangeInput, setIsChangeInput] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setForm({
            ...form,
            email: user.email,
            name: user.name
        })
    }, [user])

    const nameCustomInput = useCustomInput();
    const passCustomInput = useCustomInput();

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setIsChangeInput(true);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendUserInfo(form));
        setIsChangeInput(false);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setForm({
            email: user.email,
            name: user.name,
            password: ""
        })
        setIsChangeInput(false);
    }

    return (
        <form className={`${styles.form}`}>
            <div className="form__item mb-6">
                <Input
                    placeholder="Имя"
                    error={false}
                    name={"name"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"text"}
                    icon={"EditIcon"}
                    onBlur={passCustomInput.handleBlur}
                    onIconClick={passCustomInput.handleIconClick}
                    disabled={true}
                    ref={passCustomInput.ref}
                    value={form.name}
                />
            </div>
            <div className="form__item mb-6">
                <EmailInput onChange={handleOnChange} value={form.email} name={'email'}/>
            </div>
            <div className="form__item mb-6">
                <Input
                    placeholder="Пароль"
                    error={false}
                    name={"password"}
                    onChange={handleOnChange}
                    errorText={'Ошибка какая то'}
                    size={"default"}
                    type={"password"}
                    icon={"EditIcon"}
                    onBlur={nameCustomInput.handleBlur}
                    onIconClick={nameCustomInput.handleIconClick}
                    disabled={true}
                    ref={nameCustomInput.ref}
                    value={form.password}
                />
            </div>
            {isChangeInput && (
                <div className={`${styles.form__buttons} mb-20`}>
                    <Button type={"secondary"} size="medium" onClick={handleCancel}>Отмена</Button>
                    <Button type={"primary"} size="medium" onClick={handleSubmit}>Сохранить</Button>
                </div>
            )}
        </form>
    )
}