import React from "react";
import { Switch, Route } from "react-router-dom";
import { getcart } from "../../Store/Actions/Auth";
import { useDispatch } from "react-redux";
import Products from "../../Containers/Products";
import ProductDetails from "../../Containers/ProductDetails";

function ProductsRoute() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(getcart()), [dispatch]);
  return (
    <Switch>
      <Route path="/products/:productId" component={ProductDetails} />
      <Route path="/products" component={Products} />
    </Switch>
  );
}

export default ProductsRoute;
