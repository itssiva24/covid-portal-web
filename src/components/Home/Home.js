import React, { useEffect, useState } from 'react'
import {withAuthorization} from '../../contexts'
import { getRequests } from '../../contexts/firebase'
import Request from "./Request";
import * as ROUTES from "../../constants/routes"
const condition = (authUser) => authUser !== null

export default withAuthorization(condition, ROUTES.SIGNIN)(() => {
    
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const getRequestsData = async () => {
            const data = await getRequests()
            setRequests(data)
        }
        getRequestsData()

    }, [])

    return (
        <>
        {requests.length && requests.map(req=>(
            <Request request={req}></Request>
        ))}
        </>
    )

})
