import React from 'react';
import styles from "./profile-menu.module.css";
import {NavLink, useHistory} from "react-router-dom";
import {sendLogout} from "../../services/actions/user";
import {useDispatch} from "react-redux";

export function ProfileMenu() {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = () => {
        dispatch(sendLogout(history));
    }
    return (
        <div className={styles.profile__cont}>
            <ul className={`${styles.profile__menu} mr-15`}>
                <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/profile`} activeClassName={"text_color_primary"}>Профиль</NavLink>
                </li>
                <li className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/profile/orders`} activeClassName={"text_color_primary"}>История заказов</NavLink>
                </li>
                <li onClick={handleClick} className={`${styles.profile__menuItem} text text_type_main-medium text_color_inactive`}>
                    <NavLink to={`/exit`} activeClassName={"text_color_primary"}>Выход</NavLink>
                </li>
            </ul>
            <p className={`${styles.profile__menuSubtitle} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

    )
}