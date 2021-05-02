import React, { useEffect, useState } from "react"
import AuthUserContext from "./authUserContext"
import { auth } from "./firebase"

export default (Component) => (props) => {

    const [authUser, setAuthUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setAuthUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])



    return <AuthUserContext.Provider value={{authUser}}>
        {!loading && <Component {...props} />}
    </AuthUserContext.Provider>
} 