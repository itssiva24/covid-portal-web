import React, { useEffect, useState } from "react";
import { withAuthorization } from "../../contexts";
import { firestore } from "../../contexts/firebase";
import Request from "../Requests/Request";
import * as ROUTES from "../../constants/routes";
import InfiniteScroll from "react-infinite-scroll-component";

const condition = (authUser) => authUser !== null;

const getRequests = async (pagesize) => {
    const requestsRef = await firestore
        .collection("requests")
        .orderBy("createdAt", "desc")
        .limit(pagesize)
        .get();

    return requestsRef.docs;
}

const getMoreRequests = async (pagesize, lastDoc) =>{
    const requestsRef = await firestore
        .collection("requests")
        .orderBy("createdAt", "desc")
        .startAfter(lastDoc)
        .limit(pagesize)
        .get();
    return  requestsRef.docs;
}

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const pageSize = 5;
    const [currentRequests, setCurrentRequests] = useState([])
    const [page, setPage] = useState(0);
    const [isDone, setIsDone] = useState(false)
    const [nextRequests, setNextRequests] = useState([])
    const [lastDoc, setLastDoc] = useState(null);
    useEffect(()=>{
        console.log({page})
        updateState()
    }, [page])

    const updateState = async ()=>{
        if(page===0){
            const requestRefs = await getRequests(pageSize)
            setCurrentRequests(requestRefs.map(req=>req.data()));
            const nextRequestRefs = await getMoreRequests(pageSize, requestRefs[requestRefs.length - 1])
            setIsDone(!(nextRequestRefs.length>0));
            setLastDoc(nextRequestRefs[nextRequestRefs.length -1])
            setNextRequests(nextRequestRefs.map(ref=>ref.data()))
        }else{
            setCurrentRequests([...currentRequests, ...nextRequests])
            const nextRequestRefs = await getMoreRequests(pageSize, lastDoc)
            setIsDone(!(nextRequestRefs.length>0));
            setLastDoc(nextRequestRefs[nextRequestRefs.length -1])
            setNextRequests(nextRequestRefs.map(ref=>ref.data()))
        }
    }

    const updateAndFetch = ()=>{
        setPage(page+1)
    }
    const refresh = () => {
        setPage(0);
    };

    return (
        <>
            <InfiniteScroll
                dataLength={currentRequests.length}
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
                next={updateAndFetch}
                hasMore={!isDone}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>You have reached the end of List</b>
                    </p>
                }
            >
                {currentRequests.map((req) => (
                    <Request request={req}></Request>
                ))}
            </InfiniteScroll>
        </>
    );
});
