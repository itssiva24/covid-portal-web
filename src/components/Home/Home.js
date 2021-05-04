import React, { useEffect, useState } from "react";
import { withAuthorization } from "../../contexts";
import { getRequests } from "../../contexts/firebase";
import Request from "../Requests/Request";
import * as ROUTES from "../../constants/routes";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const condition = (authUser) => authUser !== null;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const [requests, setRequests] = useState([])

    const getRequestsData = async () => {
        const data = await getRequests()
        setRequests(data)
    }
        
    useEffect(() => {
        getRequestsData()
    }, [])

    const [showEnd, setShowEnd] = useState(false);
    return (
        <>
                {requests.map((req) => (
                    <Request request={req}></Request>
                ))}

                {
                    showEnd
                    ? <Container maxWidth="sm">
                        <Typography variant="h6">
                            You've reached the end
                        </Typography>
                      </Container>
                    : <Button color="primary" variant="contained" onClick={async() => {
                    const data = await getRequests()
                    setRequests((prev) => {
                        return [...prev, ...data]
                    })
                    if(data.length === 0){
                        setShowEnd(true)
                }

                }}>Load more</Button>
                }
        </>
    );
});
