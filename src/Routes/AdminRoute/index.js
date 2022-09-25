import React from "react";
import { Switch, Route } from "react-router-dom";

import Users from "../../Containers/Users";
import UserDetails from "../../Containers/UserDetails";

function ProductsRoute() {
  return (
    <Switch>
      <Route path="/users/:userId" component={UserDetails} />
      <Route path="/users" component={Users} />
    </Switch>
  );
}

export default ProductsRoute;
