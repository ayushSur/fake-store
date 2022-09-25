import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getProductByID } from "../../Store/Actions/Products";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useCart } from "../../Hooks/useCart";

function ProductDetails() {
  const { productId } = useParams();
  const history = useHistory();
  const [productData, setproductData] = useState({ id: productId });
  const { productList } = useSelector((state) => state.products);
  const cart = useCart(productData);
  const dispatch = useDispatch(productData);

  // Geeting the productDetails from API if not present in store
  useEffect(() => {
    let product = productList.find(
      (product) => parseInt(product.id) === parseInt(productId)
    );
    if (product) setproductData(product);
    else dispatch(getProductByID(productId));
  }, [productList, productId, dispatch]);

  // Handle page back button
  const handleGoBack = React.useCallback(() => {
    history.goBack();
  }, [history]);

  //Handle add-to / remove-from cart
  const handleCartAction = React.useCallback(() => {
    if (cart.isInCart) cart.remove();
    else cart.add();
  }, [cart]);

  if (Boolean(productData)) {
    return (
      <div className="product-details">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <IconButton color="secondary" onClick={handleGoBack}>
              <ArrowBackIcon color="secondary" />
            </IconButton>
            <Typography component="span" variant="h5">
              {productData.title}
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item>
              <Paper elevation={2} className="product-image-card">
                <img src={productData.image} alt="product" />
              </Paper>
            </Grid>
            <Grid item className="price-section">
              <Grid item>
                <Typography color="textSecondary">Price: </Typography>
                <Typography variant="h6">{productData.price}$</Typography>
              </Grid>
              <Grid item>
                <Typography color="textSecondary">Category: </Typography>
                <Typography variant="h6">{productData.category}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={
                    cart.isInCart ? (
                      <DeleteForeverIcon />
                    ) : (
                      <ShoppingBasketIcon />
                    )
                  }
                  onClick={handleCartAction}
                >
                  {cart.isInCart ? "Remoe from cart" : "Add to cart"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary">Description: </Typography>
            <Typography>{productData.description}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  } else
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
}

export default React.memo(ProductDetails);
