import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home, { AddVolunteer } from "../components/Home";
import SignIn from "../components/SignIn";
import * as ROUTES from "../constants/routes";
import { withAuthUserProvider } from "../contexts";
import { RootLayout } from "../components/layouts";
import NewRequest from "../components/newRequest";
import RequestDetail from "../components/RequestDetail";
import { MyRequests, RequestsAssigned } from "../components/Requests";

export default withAuthUserProvider(({ Component, pageProps }) => {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.SIGNIN} component={SignIn} />
                <RootLayout>
                    <Route exact path={ROUTES.HOME} component={Home}></Route>
                    {/* newRoutes go here */}
                    <Route
                        exact
                        path={ROUTES.NEW_REQUEST}
                        component={NewRequest}
                    ></Route>
                    <Route
                        exact
                        path={ROUTES.REQUESTS_ASSIGNED}
                        component={RequestsAssigned}
                    ></Route>
                    <Route
                        exact
                        path={ROUTES.REQUEST_DETAIL}
                        component={RequestDetail}
                    ></Route>
                    <Route
                        exact
                        path={ROUTES.ADD_VOLUNTEER}
                        component={AddVolunteer}
                    ></Route>
                    <Route
                        exact
                        path={ROUTES.MY_REQUESTS}
                        component={MyRequests}
                    ></Route>
                </RootLayout>
            </Switch>
        </Router>
    );
});
