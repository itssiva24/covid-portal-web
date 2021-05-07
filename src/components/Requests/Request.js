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
        background: theme.palette.grey[800],
        padding: "16px",
        margin: "16px auto",
        borderRadius: 8,

        "&:hover": {
            background: theme.palette.grey[700],
        },
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "0 1em",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        padding: "4px 0 18px",
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
        padding: "8px 0 40px",
    },

    footer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    button: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
}));

function toDateTime(secs) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    const t = new Date(0); // Epoch
    t.setMilliseconds(secs);
    return t.toLocaleString("en-UK", options);
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
                {request.description && (
                    <Typography variant="body2">
                        {`${request.description.slice(0, 64)}...`}
                    </Typography>
                )}
            </Box>
            <Box className={classes.footer}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                >
                    {request.state === "" ? "State N/A" : request.state}
                </Button>
                <Button
                    variant="outlined"
                    color={request.resolved ? "primary" : "grey"}
                    size="small"
                    className={classes.button}
                >
                    {request.resolved ? "Resolved" : "Not Resolved"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
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
