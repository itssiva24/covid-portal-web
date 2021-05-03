import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import SignIn from "../components/SignIn";
import * as ROUTES from "../constants/routes";
import { withAuthUserProvider } from "../contexts";
import { RootLayout } from "../components/layouts";
import NewRequest from "../components/newRequest";
export default withAuthUserProvider(({ Component, pageProps }) => {
  // const { authUser } = useContext(AuthUserContext)

  return (
    <Router>
      <Switch>
        {/* <Route path={ROUTES.SIGNIN} component={SignIn} /> */}
        <RootLayout>
          <Route exact path={ROUTES.HOME} component={Home}></Route>
          {/* newRoutes go here */}
          <Route exact path="/newRequest" component={NewRequest}></Route>
        </RootLayout>
      </Switch>
    </Router>
  );
});
