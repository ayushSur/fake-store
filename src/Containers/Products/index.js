import React, { useCallback, useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories } from "../../Store/Actions/Products";
import ProductCard from "../../Components/Products/ProductCard";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";

function Products() {
  // Fetching the state from store
  const { productList, isLoading, categories } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  // Getting all products on mount
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // Category filter change handler
  const handleFilterChange = useCallback(
    (event, value) => {
      if (value) dispatch(getProducts(value));
      else dispatch(getProducts());
    },
    [dispatch]
  );

  return (
    <div className="Products-container">
      <div className="header">
        <Typography variant="h5" component="h5">
          PRODUCTS
        </Typography>
        <Autocomplete
          id="product-filter"
          options={categories}
          style={{ width: 300 }}
          onChange={handleFilterChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" variant="standard" />
          )}
        />
      </div>
      <Grid
        container
        className="product-grid"
        spacing={6}
        justify="space-evenly"
      >
        {productList.map((product) => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default React.memo(Products);
