import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Containers/Login";
import CirclularProgress from "@material-ui/core/CircularProgress";

const ProductsRoute = React.lazy(() => import("./ProductsRoute"));
const AdminRoute = React.lazy(() => import("./AdminRoute"));

function AppRoutes() {
  const { isAuth, isAdmin } = useSelector((state) => state.auth);

  if (isAuth === -1) {
    // Below return can also have a loading/spash screen component
    return (
      <div className="loader">
        <CirclularProgress />
      </div>
    );
  } else if (isAuth === 0)
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
  else if (!isAdmin)
    return (
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/products" component={ProductsRoute} />
          <Redirect from="/" to="/products" />
        </Switch>
      </Suspense>
    );
  else
    return (
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/users" component={AdminRoute} />
          <Redirect from="/" to="/users" />
        </Switch>
      </Suspense>
    );
}

export default AppRoutes;
