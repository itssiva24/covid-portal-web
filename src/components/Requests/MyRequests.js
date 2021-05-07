import { useContext, useState } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import Loader from "../Loader";
import * as ROUTES from "../../constants/routes";
import { Typography } from "@material-ui/core";
import useGetMyRequest from "../../hooks/useGetMyRequest";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";

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
    const { authUser } = useContext(AuthUserContext);
    const classes = useStyles();

    const [refresh, setRefresh] = useState(false);
    const { myRequests, fetched, lastDoc, loadMore } = useGetMyRequest(
        authUser.uid
    );

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />
            </div>
        );
    else {
        if (myRequests.length > 0) {
            return (
                <InfiniteScroll
                    dataLength={myRequests.length}
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
                    {myRequests.map((req) => (
                        <Request request={req} key={req.id} />
                    ))}
                </InfiniteScroll>
            );

            // return myRequests.map((req) => (
            //     <Request request={req} key={req.id} />
            // ));
        } else
            return (
                <Typography component="h4" variant="h6" align="center">
                    No requests made yet!
                </Typography>
            );
    }
});
