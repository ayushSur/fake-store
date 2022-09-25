import React from "react";
import "./header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import CartPopup from "./CartPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout, toogleIsAdmin } from "../../../Store/Actions/Auth";

const Header = () => {
  const { cart, isAuth, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    if (cart.length === 0) setAnchorEl(null);
  }, [cart]);

  const handleCartOpen = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCartClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  //logout handler
  const handleLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //isAdmin toggle
  const handleIsAdminToggle = React.useCallback(() => {
    dispatch(toogleIsAdmin());
  }, [dispatch]);

  return (
    <AppBar
      position="sticky"
      className="header"
      color="primary"
      elevation={5}
      variant="elevation"
    >
      <Toolbar>
        <Typography variant="h4" className="title">
          <StorefrontIcon fontSize="large" />
          Fake Store
        </Typography>
        <div className="controls">
          {isAuth === 1 && (
            <>
              {!isAdmin && (
                <IconButton
                  color="inherit"
                  onClick={handleCartOpen}
                  disabled={cart.length === 0}
                >
                  <Badge
                    color="secondary"
                    badgeContent={cart.length}
                    showZero={false}
                  >
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
              )}
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
          {isAuth === 0 && (
            <Button
              id="login-button"
              variant="outlined"
              color="inherit"
              onClick={handleIsAdminToggle}
              startIcon={<ExitToAppIcon />}
            >
              To {isAdmin ? "User Login" : "Admin Login"}
            </Button>
          )}
        </div>
      </Toolbar>
      <CartPopup onClose={handleCartClose} anchorEl={anchorEl} cart={cart} />
    </AppBar>
  );
};

export default React.memo(Header);
