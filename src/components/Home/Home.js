import React, { useEffect, useState } from "react";
import { withAuthorization } from "../../contexts";
import { getRequests } from "../../contexts/firebase";
import { Request } from "../Requests";
import * as ROUTES from "../../constants/routes";
const condition = (authUser) => authUser !== null;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRequestsData = async () => {
            const data = await getRequests();
            setRequests(data);
            setLoading(false);
        };
        getRequestsData();
    }, []);

    return (
        <>
            {!loading ? (
                requests.map((req) => <Request request={req} />)
            ) : (
                <h2>Loading</h2>
            )}
        </>
    );
});
