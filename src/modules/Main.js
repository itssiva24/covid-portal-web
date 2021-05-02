import React, { useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import SignIn from "../components/SignIn"
import * as ROUTES from "../constants/routes"
import AuthUserContext, {withAuthUserProvider} from "../contexts"


export default withAuthUserProvider(({ Component, pageProps }) => {
    const { authUser } = useContext(AuthUserContext)

    
    return (
        <Router>
            {
                <div className="App">
                    {/* <Navbar /> */}
                    <div className="head"></div>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.SIGNIN} component={SignIn} />
                    </Switch>
                    {/* <Footer /> */}
                </div>
            }
        </Router>
    )
})
