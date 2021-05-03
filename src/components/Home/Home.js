import { Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import * as ROUTES from "../../constants/routes"
import AuthUserContext, {withAuthorization} from '../../contexts'
import { getRequests, signOut } from '../../contexts/firebase'
import Request from "./Request";
import {RootLayout} from "../layouts"
// import NavBar from "../Navbar"


const condition = (authUser) => authUser !== undefined

export default withAuthorization(condition, ROUTES.SIGNIN)(() => {
    const history = useHistory()
    const { authUser } = useContext(AuthUserContext)
    // TODO: uncomment to read data from db 
    const [requests, setRequests] = useState([{"createdAt":{"seconds":1619965854,"nanoseconds":0},"resolved":false,"createdBy":"none","description":"lorem ipsum","title":"Oxygen cylinder needed","assignedTo":"none","imageUrl":"none"},{"createdAt":{"seconds":1619965854,"nanoseconds":0},"resolved":false,"createdBy":"none","description":"lorem ipsum","title":"Oxygen cylinder needed","assignedTo":"none","imageUrl":"none"}])

    // const [requests, setRequests] = useState([])

    // useEffect(() => {

    //     const getRequestsData = async () => {
    //         const data = await getRequests()
    //         setRequests(data)
    //     }
    //     getRequestsData()

    // }, [])


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
        <RootLayout >
        {/* <h2>HOME</h2>
            {authUser && <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign out</Button>}
        <h2>REQUEST FEED</h2> */}
        {/* {requests.length && JSON.stringify(requests)} */}
        {requests.length && requests.map(req=>(
            <Request request={req}></Request>
        ))}
        </RootLayout>
        
        </>
    )

})
