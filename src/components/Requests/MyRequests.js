import { useContext, useState } from "react";
import { RequestsTable } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import Loader from "../Loader";
import * as ROUTES from "../../constants/routes";
import { Typography } from "@material-ui/core";
import useGetMyRequest from "../../hooks/useGetMyRequest";
import { makeStyles } from "@material-ui/core/styles";

import { REQUEST_TYPE } from "../../utils";
import { Paper, Tabs, Tab } from "@material-ui/core";

const condition = (authUser) => !!authUser;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const { authUser } = useContext(AuthUserContext);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const [type, setType] = useState(REQUEST_TYPE.Medical);
    const { myRequests, fetched, lastDoc, loadMore } = useGetMyRequest(
        authUser.uid,
        type
    );

    const requestType = [REQUEST_TYPE.Medical, REQUEST_TYPE.Monetary];

    const handleChange = (e, val) => {
        setType(requestType[val]);
    };

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />
            </div>
        );
    else {
        return (
            <Paper className={classes.root}>
                <div style={{ marginBottom: 8 }}>
                    <Tabs
                        value={requestType.findIndex((t) => t === type)}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="standard"
                        centered={true}
                    >
                        <Tab label="Medical" />
                        <Tab label="Monetary" />
                    </Tabs>
                </div>
                <RequestsTable
                    {...{
                        type,
                        request: myRequests,
                        loadMore,
                        lastDoc,
                        fetched,
                        refresh,
                        setRefresh,
                    }}
                />
            </Paper>
        );
    }
});
