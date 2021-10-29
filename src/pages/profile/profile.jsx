import React from "react";
import styles from "./profile.module.css";
import {ProfileForm} from "../../components/profile-form/profile-form";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";

export function Profile() {
    return (
        <div className="container">
            <div className={`${styles.profile__container} mt-30 pr-5 pl-5`}>
                <ProfileMenu/>
                <div className={`${styles.profile__content}`}>
                    <ProfileForm/>
                </div>
            </div>
        </div>
    )
}