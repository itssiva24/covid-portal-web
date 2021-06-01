import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home, { AddVolunteer, RegisterAsAVolunteer } from "../components/Home";
import SignIn from "../components/SignIn";
import * as ROUTES from "../constants/routes";
import { withAuthUserProvider } from "../contexts";
import { RootLayout } from "../components/layouts";
import NewRequest from "../components/newRequest";
import RequestDetail from "../components/RequestDetail";
import { MyRequests, RequestsAssigned } from "../components/Requests";
import ContactUs from "../components/ContactUs/ContactUs";
import EditRequest from "../components/EditRequest";
import HowToUse from "../components/HowToUse";
import { RequestsProvider } from "../contexts/requestsContext";

export default withAuthUserProvider(({ Component, pageProps }) => {
    return (
        <Router basename="/iitmhelps">
            <RequestsProvider>
                <Switch>
                    <Route path={ROUTES.SIGNIN} component={SignIn} />
                    <RootLayout>
                        <Route
                            exact
                            path={ROUTES.HOME}
                            component={Home}
                        ></Route>
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
                        <Route
                            exact
                            path={ROUTES.EDIT_REQUEST}
                            component={EditRequest}
                        ></Route>
                        <Route
                            path={ROUTES.HOW_TO_USE}
                            component={HowToUse}
                        ></Route>
                        <Route
                            exact
                            path={ROUTES.CONTACT_US}
                            component={ContactUs}
                        ></Route>
                        <Route
                            exact
                            path={ROUTES.REGISTER_AS_A_VOLUNTEER}
                            component={RegisterAsAVolunteer}
                        ></Route>
                    </RootLayout>
                </Switch>
            </RequestsProvider>
        </Router>
    );
});
