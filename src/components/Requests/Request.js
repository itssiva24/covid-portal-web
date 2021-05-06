import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CallMade } from "@material-ui/icons";
import * as ROUTES from "../../constants/routes";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        padding: "16px",
        margin: "16px auto",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "1em",
    },
    avatar: {
        height: "32px",
        width: "32px",
    },
    name: {
        flex: "1",
        fontSize: 16,
    },
    messageBox: {
        padding: "16px 0 24px",
    },

    footer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    viewDetailsButton: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
}));

function toDateTime(secs) {
    var t = new Date(0); // Epoch
    t.setMilliseconds(secs);
    return t.toLocaleString();
}

function Request({ request }) {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.root}>
            <Box className={classes.header}>
                <Avatar
                    className={classes.avatar}
                    alt={`${request.createdBy}`}
                    src={request.imageUrl}
                ></Avatar>
                <Typography variant="p" className={classes.name}>
                    {request.createdBy}
                </Typography>
                <Typography variant="body1">
                    {toDateTime(request.createdAt)}
                </Typography>
            </Box>
            <Box className={classes.messageBox}>
                <Typography variant="h6">{request.title}</Typography>
                <Typography variant="body2">
                    {`${request.description.slice(0, 64)}...`}
                </Typography>
            </Box>
            <Box className={classes.footer}>
                <Button variant="outlined" color="primary" size="small">
                    {request.state == "" ? "State N/A" : request.state}
                </Button>
                <Button
                    variant="outlined"
                    color={request.resolved ? "primary" : "secondary"}
                    size="small"
                >
                    {request.resolved ? "Resolved" : "Not Resolved"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<CallMade />}
                    className={classes.viewDetailsButton}
                >
                    <Link
                        style={{ color: "#fff", textDecoration: "none" }}
                        to={`/request/${request.id}`}
                    >
                        View Details
                    </Link>
                </Button>
            </Box>
        </Container>
    );
}

export default Request;
