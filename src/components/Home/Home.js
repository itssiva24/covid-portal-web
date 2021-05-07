import React from "react";
import { withAuthorization } from "../../contexts";
import Request from "../Requests/Request";
import * as ROUTES from "../../constants/routes";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchRequests from "../../hooks/useFetchRequest";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader";

const condition = (authUser) => !!authUser;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const { request, loadMore, lastDoc, fetched } = useFetchRequests();

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />
            </div>
        );
    else
        return (
            <InfiniteScroll
                dataLength={request.length}
                refreshFunction={() => setRefresh(!refresh)}
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
                next={loadMore}
                hasMore={lastDoc ? true : false}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <h3 style={{ textAlign: "center" }}>
                        <b>No More Requests!!</b>
                    </h3>
                }
            >
                {request.map((req) => (
                    <Request request={req} key={req.createdAt}></Request>
                ))}
            </InfiniteScroll>
        );
});
