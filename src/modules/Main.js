import React, { useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import SignIn from "../components/SignIn"
import * as ROUTES from "../constants/routes"
import {withAuthUserProvider} from "../contexts"
import {RootLayout} from "../components/layouts"
import NewRequest from "../components/newRequest"
import RequestDetail from "../components/RequestDetail"
export default withAuthUserProvider(({ Component, pageProps }) => {
    // const { authUser } = useContext(AuthUserContext)

    
    return (
        <Router>
            <Switch>
                <Route exact path={ROUTES.SIGNIN} component={SignIn} />
                <RootLayout>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home}></Route>
                        <Route exact path={ROUTES.NEW_REQUEST} component={NewRequest}></Route>
                        <Route exact path={ROUTES.REQUEST_DETAIL} component={RequestDetail}></Route>
                    </Switch>
                </RootLayout>
            </Switch>
        </Router>
    )
})
