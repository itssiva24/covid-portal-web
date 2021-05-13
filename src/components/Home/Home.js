import React from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import useFetchRequests from "../../hooks/useFetchRequest";
import { useState } from "react";
import Loader from "../Loader";
import { RequestsTable } from "../Requests";
import { REQUEST_TYPE } from "../../utils";
import { Paper, Tabs, Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const [type, setType] = useState(REQUEST_TYPE.Medical);
    const { request, loadMore, lastDoc, fetched } = useFetchRequests(type);

    const requestType = [REQUEST_TYPE.Medical, REQUEST_TYPE.Monetary];

    const handleChange = (e, val) => {
        setType(requestType[val]);
    };

    if (!fetched)
        return (
            <div>
                <Loader />
            </div>
        );
    else
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
                        request,
                        loadMore,
                        lastDoc,
                        fetched,
                        refresh,
                        setRefresh,
                        type,
                    }}
                />
            </Paper>
        );
});
