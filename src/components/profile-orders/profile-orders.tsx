import React, { SyntheticEvent, useEffect } from 'react';
import profileOrdersStyle from "./profile-orders.module.css";
import { FeedItem } from "../feed-item/feed-item";
import Modal from "../modal/modal";
import { FeedDetails } from "../feed-details/feed-details";
import { useDispatch, useSelector } from "../../services/types/types";

import { orderWsConnectionClosed, orderWsConnectionStart } from "../../services/actions/orders";
import { wsURL } from "../../utils/constants";
import { getCookie } from "../../utils/funcs";
import { RootState } from '../../services/types/types';
import { TFeedItem } from '../../services/types/user';

export const ProfileOrders = () => {
  const { orders, wsConnected } = useSelector((state: RootState) => state.orderData);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token')?.replace('Bearer ', '');
    dispatch(orderWsConnectionStart(`${wsURL}?token=${token}`));
    return () => {
      dispatch(orderWsConnectionClosed());
    }
  }, [dispatch]);

  return (
    <>
      {orders && (
        <div className={`${profileOrdersStyle.profile__orders} mt-8 custom-scroll`}>
          {wsConnected && orders.length === 0 && (<h1>У вас нет заказов.</h1>)}
          {wsConnected && orders.map((item, index) => <FeedItem data={item} key={index} />)}
        </div>
      )}
    </>

  )
}