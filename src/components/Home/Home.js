import React, { useContext } from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import useFetchRequests from "../../hooks/useFetchRequest";
import { useState } from "react";
import Loader from "../Loader";
import { RequestsTable } from "../Requests";
import { REQUEST_TYPE } from "../../utils";
import { Paper, Tabs, Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import RequestsContexts from "../../contexts/requestsContext";

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
    const { request, loadMore, fetched, lastDoc, type, handleChange } =
        useContext(RequestsContexts);

    const requestType = [
        REQUEST_TYPE.Medical.toLowerCase(),
        REQUEST_TYPE.Monetary.toLowerCase(),
    ];

    if (!fetched[type] && !request[type].length)
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
                        request: request[type],
                        loadMore,
                        lastDoc: lastDoc[type],
                        fetched: !!fetched[type] || !!request[type].length,
                        refresh,
                        setRefresh,
                        type,
                    }}
                />
            </Paper>
        );
});
