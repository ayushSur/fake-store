import React from "react";
import "./CartPopup.css";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import CartPopupItem from "./CartPopupItem";

function CartPopup(props) {
  const { anchorEl, onClose, cart } = props;

  return (
    <Popover
      id={"simple-popover"}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className="cart-popup-container"
    >
      <Typography component="div" className="cart-popup">
        {cart.map((product) => (
          <CartPopupItem product={product} key={product.id} />
        ))}
      </Typography>
    </Popover>
  );
}

export default React.memo(CartPopup);
