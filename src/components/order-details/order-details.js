import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import checkImage from '../../images/graphics.png'

function OrderDetails() {
    return(
        <div className={`${orderDetailsStyles.order} pb-15`}>
            <h3 className={`text text_primary_ligth text_type_digits-large`}>
                034536
            </h3>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <div className={`${orderDetailsStyles.status} mt-15 mb-15`}>
                <img src={checkImage} alt="done"/>
            </div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default  OrderDetails;