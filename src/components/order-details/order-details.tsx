import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import checkImage from '../../images/graphics.png';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from '../../services/types/types';
import {CLEAR_CONSTRUCTOR} from "../../services/actions/burger-constructor";

/*
type TOrderDetailsProps = {
    id: string
}
*/

const OrderDetails: React.FC = () => {
    const {orderNumber} = useSelector((state) => state.orderData)
    const dispatch = useDispatch();
    if (orderNumber) {
      dispatch({
        type: CLEAR_CONSTRUCTOR
      })
    }

    return(
        <>
            {!orderNumber && (<h1>Идет загрузка...</h1>)} 
            <div className={`${orderDetailsStyles.order} pb-15`}>
                <h3 className={`text text_primary_ligth text_type_digits-large`}>
                    {orderNumber}
                </h3>
                <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
                <div className={`${orderDetailsStyles.status} mt-15 mb-15`}>
                    <img src={checkImage} alt="done"/>
                </div>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
        
}
/*
OrderDetails.propTypes = {
    id: PropTypes.number.isRequired
}*/

export default  OrderDetails;