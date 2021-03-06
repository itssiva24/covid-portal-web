import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import { getDate, REQUEST_TYPE } from "../../utils";

const useStyles = makeStyles((theme) => ({
    body: {
        padding: 16,
    },
    row: {
        cursor: "pointer",
        "&:hover": {
            background: `${theme.palette.grey[800]} !important`,
        },
    },
    title: {
        fontWeight: 600,
    },
    smallBox: {
        maxWidth: 144,
    },
    mediumBox: {
        minWidth: 178,
        maxWidth: 196,
    },
    largeBox: {
        minWidth: 240,
    },
    veryLargeBox: {
        minWidth: 264,
    },
    button: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
}));

export default function ({
    request,
    loadMore,
    lastDoc,
    fetched,
    refresh,
    setRefresh,
    type,
}) {
    const classes = useStyles();

    const history = useHistory();
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        setColumns(getColumns(type));
    }, [type]);
    const head1 = [
        {
            id: "title",
            label: "Title",
        },
        {
            id: "requirement",
            label: "Requirement",
        },
        {
            id: "description",
            label: "Description",
        },
        {
            id: "state",
            label: "State",
        },
        { id: "volunteer", label: "Volunteer" },
        {
            id: "date",
            label: "Date",
        },
    ];
    const head2 = [
        {
            id: "title",
            label: "Title",
        },
        {
            id: "amountCollected",
            label: "Amount Collected",
        },
        { id: "volunteer", label: "Volunteer" },
        {
            id: "date",
            label: "Date",
        },
    ];

    const getColumns = (type) => {
        return type.toUpperCase() === REQUEST_TYPE.Medical ? head1 : head2;
    };

    const CustomTableHead = () => (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell>{headCell.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    if (!fetched)
        return (
            <div>
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
                hasMore={lastDoc && request.length >= 10 ? true : false}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <h4 style={{ textAlign: "center" }}>
                        <b>You have reached the end!</b>
                    </h4>
                }
            >
                <TableContainer>
                    <Table>
                        <CustomTableHead type={type} />
                        <TableBody className={classes.body}>
                            {request.map((req, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => {
                                            history.push(`/request/${req.id}`);
                                        }}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={req.id}
                                        className={classes.row}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            className={classes.title}
                                        >
                                            {req.title.length > 24
                                                ? `${req.title.slice(0, 24)}..`
                                                : req.title}
                                        </TableCell>
                                        {type.toUpperCase() ===
                                            REQUEST_TYPE.Medical && (
                                            <TableCell
                                                className={classes.mediumBox}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    className={classes.button}
                                                >
                                                    {req.requirement}
                                                </Button>
                                            </TableCell>
                                        )}
                                        {req.type === REQUEST_TYPE.Medical ? (
                                            <>
                                                <TableCell
                                                    className={
                                                        classes.mediumBox
                                                    }
                                                >
                                                    {`${req.description.slice(
                                                        0,
                                                        42
                                                    )}...`}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.largeBox}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        className={
                                                            classes.button
                                                        }
                                                    >
                                                        {req.state === ""
                                                            ? "State N/A"
                                                            : req.state}
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <TableCell>
                                                <LinearProgress
                                                    value={
                                                        req.amountNeeded
                                                            ? (req.amountCollected /
                                                                  req.amountNeeded) *
                                                              100
                                                            : 0
                                                    }
                                                    variant="determinate"
                                                    style={{
                                                        height: 6,
                                                        borderRadius: 2,
                                                    }}
                                                />
                                                <Typography
                                                    align="right"
                                                    style={{ fontSize: 14 }}
                                                >
                                                    &#x20B9;
                                                    {req.amountNeeded &&
                                                        `${req.amountCollected.toLocaleString(
                                                            "en-IN"
                                                        )}/${req.amountNeeded.toLocaleString(
                                                            "en-IN"
                                                        )}`}
                                                </Typography>
                                            </TableCell>
                                        )}

                                        <TableCell
                                            className={classes.veryLargeBox}
                                        >
                                            <Button
                                                variant="outlined"
                                                color={
                                                    req.assignedTo
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                                size="small"
                                                className={classes.button}
                                            >
                                                {req.assignedTo
                                                    ? req.assignedToVolunteer
                                                    : "Not assigned"}
                                            </Button>
                                        </TableCell>

                                        {/* <TableCell
                                            className={classes.mediumBox}
                                        >
                                            <Button
                                                variant="outlined"
                                                color={
                                                    req.resolved
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                                size="small"
                                                className={classes.button}
                                            >
                                                {req.resolved
                                                    ? "Resolved"
                                                    : "Not resolved"}
                                            </Button>
                                        </TableCell> */}
                                        <TableCell>
                                            {getDate(req.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InfiniteScroll>
        );
}
