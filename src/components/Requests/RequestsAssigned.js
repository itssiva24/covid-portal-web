import { useContext, useState } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import { Typography } from "@material-ui/core";
import { UserRole } from "../../utils";
import useGetRequestAssigned from "../../hooks/useGetRequestAssigned";
import Loader from "../Loader";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";

const condition = (authUser) =>
    !!authUser && authUser.role === UserRole.Volunteer;

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
    const {
        requestsAssigned,
        fetched,
        lastDoc,
        loadMore,
    } = useGetRequestAssigned(authUser.uid);

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />
            </div>
        );
    else {
        if (requestsAssigned.length > 0) {
            return (
                <InfiniteScroll
                    dataLength={requestsAssigned.length}
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
                    {requestsAssigned.map((req) => (
                        <Request request={req} key={req.id} />
                    ))}
                </InfiniteScroll>
            );
        } else
            return (
                <Typography component="h4" variant="h6" align="center">
                    No requests assigned yet
                </Typography>
            );
    }
});
