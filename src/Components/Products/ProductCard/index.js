import React from "react";
import "./ProductCard.css";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useCart } from "../../../Hooks/useCart";

function ProductCard(props) {
  // Recieving product details from prop
  const { product } = props;
  const { id, title, price, image } = product;

  const cart = useCart(product);
  const history = useHistory();

  // Redirecting to details page
  const handleRedirect = React.useCallback(() => {
    history.push(`/products/${id}`);
  }, [history, id]);

  //Handle add-to / remove-from cart
  const handleCartAction = React.useCallback(() => {
    if (cart.isInCart) cart.remove();
    else cart.add();
  }, [cart]);

  return (
    <Card className="product-card" square variant="elevation" elevation={5}>
      <CardActionArea onClick={handleRedirect}>
        <CardMedia image={image} className="image" title={title} />
        <CardContent className="content">
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className="title"
            noWrap
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="actions">
        <Button
          startIcon={
            cart.isInCart ? <DeleteForeverIcon /> : <ShoppingBasketIcon />
          }
          size="small"
          color="secondary"
          onClick={handleCartAction}
          variant="outlined"
        >
          {cart.isInCart ? "Remove from cart" : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductCard);
