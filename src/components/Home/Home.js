import React, { useEffect, useState } from "react";
import { withAuthorization } from "../../contexts";
import { getRequests } from "../../contexts/firebase";
import Request from "../Requests/Request";
import * as ROUTES from "../../constants/routes";
import InfiniteScroll from "react-infinite-scroll-component";

import tempdb from "./_tempDB";

const condition = (authUser) => authUser !== null;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const getRequestsData = async () => {
            const data = await getRequests()
            setRequests(data)
        }
        getRequestsData()

    }, [])

    // const [requests, setRequests] = useState(tempdb.slice(0, 3));
    console.log(requests);
    const [page, setPage] = useState(1);

    // const fetchData = () => {
    //     setRequests([...requests, ...tempdb.slice(page, page + 3)]);
    //     setPage(page + 1);
    //     console.log(requests);
    // };
    const refresh = () => {};
    const hasMore = () => {};
    return (
        <>
            {/* {requests.length && requests.map(req=>(
            <Request request={req}></Request>
        ))} */}
            <InfiniteScroll
                dataLength={requests.length}
                pullDownToRefresh
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                        &#8595; Pull down to refresh
                    </h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                        &#8593; Release to refresh
                    </h3>
                }
                refreshFunction={refresh}
                // next={fetchData}
                // hasMore={tempdb.length >= page * 3}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>You have reached the end of List</b>
                    </p>
                }
            >
                {requests.map((req) => (
                    <Request request={req}></Request>
                ))}
            </InfiniteScroll>
        </>
    );
});
