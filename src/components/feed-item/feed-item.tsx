import React, { FC, SyntheticEvent, useMemo } from 'react';
import feedStyles from "../../pages/feed/feed.module.css";
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { getDate } from "../../utils/funcs";
import { TFeedItem } from '../../services/types/user';
import { TLocationState, useSelector } from '../../services/types/types';


type TFeedItemProps = {
  data: TFeedItem;
}

export const FeedItem: FC<TFeedItemProps> = (props) => {
  const location = useLocation<TLocationState>();
  const { url } = useRouteMatch();

  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const _id: number = props.data.number;

  const uniqueOrderIngredients = Array.from(new Set(props.data.ingredients));

  const orderIngredients = uniqueOrderIngredients.map((ingredient) => {
    return ingredients.find((item) => item._id === ingredient);
  });

  const price = orderIngredients.reduce((acc, curr) => {
    if (curr) {
      if (curr.type === 'bun') {
        acc += curr.price * 2;
      } else {
        acc += curr.price;
      }

    }
    return acc;
  }, 0)

  return (
    <Link to={{ pathname: `${url}/${_id}`, state: { background: location } }}
      className={`${feedStyles.feed} mt-4`}>
      <div className={`${feedStyles.feed__top}`}>
        <p className={`text text_type_digits-default`}>#{props.data.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{getDate(props.data.createdAt)}</p>
      </div>
      <div className="feed__center">
        <h3 className={`text text_type_digits-default mt-6 mb-6`}>{props.data.name}</h3>
      </div>
      <div className={`${feedStyles.feed__bottom}`}>
        <div className={`${feedStyles.ingredients}`} style={{ position: "relative" }}>
          {orderIngredients.slice(0, 5).map((item, index) => (<img src={item?.image_mobile} alt="" className={`${feedStyles.ingredient}`} key={index} style={{ zIndex: 5 - index }} />))}
          {orderIngredients.length > 5 && (<span className={`${feedStyles.more} text text_type_main-default`}>+{orderIngredients.length - 5}</span>)}
        </div>
        <div className={`${constructorStyle.total__price} mr-10`}>
          <span className="text text_type_digits-medium">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}