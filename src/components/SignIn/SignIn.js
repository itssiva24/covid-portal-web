import React, { useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import * as ROUTES from "../../constants/routes"
import { createUser, firestore, signInWithGoogle } from '../../contexts/firebase'
import AuthUserContext, {withAuthorization} from '../../contexts'
import { useHistory } from 'react-router'
import { UserRole } from '../../utils'

const condition = (authUser) => authUser == undefined


export default withAuthorization(
    condition,
    ROUTES.HOME
)(
() => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const {authUser} = useContext(AuthUserContext)

    const googleSignIn = async () => {
        try {
            const cred = await signInWithGoogle()
            await createUser(cred)
            history.push(ROUTES.HOME)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={googleSignIn} disabled={loading}>
                SignIn with google
            </Button>
        </div>
    )
}) 