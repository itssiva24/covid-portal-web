import { Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import * as ROUTES from "../../constants/routes"
import AuthUserContext, {withAuthorization} from '../../contexts'
import { getRequests, signOut } from '../../contexts/firebase'


const condition = (authUser) => authUser !== undefined

export default withAuthorization(condition, ROUTES.SIGNIN)(() => {
    const history = useHistory()
    const { authUser } = useContext(AuthUserContext)
    const [requests, setRequests] = useState([])


    useEffect(() => {

        const getRequestsData = async () => {
            const data = await getRequests()
            setRequests(data)
        }
        getRequestsData()

    }, [])


    const handleSignOut = async () => {
        try {
            await signOut()
            history.push(ROUTES.SIGNIN)
          } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <h2>HOME</h2>
            {authUser && <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign out</Button>}
        <h2>REQUEST FEED</h2>
        {requests.length && JSON.stringify(requests)}
        </>
    )

})
