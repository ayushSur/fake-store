import React from "react";
import { useDispatch, useSelector } from "react-redux";
import pick from "lodash/pick";
import { addToCart, removeFromCart } from "../../Store/Actions/Auth";

export const useCart = (product) => {
  let returnValue = React.useRef();
  const dispatch = useDispatch();
  const { id } = product;
  const { cart } = useSelector((state) => state.auth);

  const isInCart = React.useMemo(
    () => Boolean(cart.find((cartItem) => cartItem.id === id)),
    [cart, id]
  );
  const add = React.useCallback(
    (quantity = 1) =>
      dispatch(addToCart(pick(product, ["id", "image", "title"]))),
    [dispatch, product]
  );
  const remove = React.useCallback(
    (quantity = -1) =>
      dispatch(removeFromCart(pick(product, ["id", "image", "title"]))),
    [dispatch, product]
  );

  returnValue.current = React.useMemo(
    () => ({
      add,
      remove,
      isInCart,
    }),
    [add, remove, isInCart]
  );

  return returnValue.current;
};
