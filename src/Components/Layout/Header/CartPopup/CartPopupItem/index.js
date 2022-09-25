import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useCart } from "../../../../../Hooks/useCart";

function CartPopupItem(props) {
  const { product } = props;
  const { remove } = useCart(product);

  //Remove from cart
  const handleRemoveFromCart = React.useCallback(() => remove(), [remove]);
  return (
    <div className="cart-popup-item">
      <Avatar
        src={product.image}
        alt={product.id.toString()}
        variant="square"
      />
      &nbsp;
      <Typography component="span" noWrap>
        {product.title}
      </Typography>
      <IconButton color="secondary" onClick={handleRemoveFromCart}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  );
}

export default React.memo(CartPopupItem);
