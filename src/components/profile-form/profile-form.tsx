import React, { useEffect, useState, ChangeEvent, SyntheticEvent, FormEvent } from "react";
import styles from "./profile-form.module.css";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCustomInput } from "../../hooks/useInput";
import { getUserInfo, sendUserInfo } from "../../services/actions/user";
import { TForm } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/types/types";

export function ProfileForm() {
    const { user } = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const [form, setForm] = useState<TForm>({
        name: "",
        email: "",
        password: ""
    })

    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);

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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setIsChangeInput(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(sendUserInfo(form));
        setIsChangeInput(false);
    }

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setForm({
            email: user.email,
            name: user.name,
            password: ""
        })
        setIsChangeInput(false);
    }

    return (
        <form className={`${styles.form} mt-30`} onSubmit={handleSubmit}>
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
                <EmailInput onChange={handleOnChange} value={form.email} name={'email'} />
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
                    <Button type={"primary"} size="medium">Изменить</Button>
                </div>
            )}
        </form>
    )
}