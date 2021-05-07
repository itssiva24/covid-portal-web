import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useStyles } from "../RequestDetail/RequestDetail";

function toDateTime(secs) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
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
                <Typography variant="body3" className={classes.headerText}>
                    {request.createdBy}
                </Typography>
                <div>
                    <Typography variant="body3" className={classes.headerText}>
                        {toDateTime(request.createdAt)}
                    </Typography>
                </div>
            </Box>
            <Box className={classes.messageBox}>
                <Typography variant="h6" className={classes.title}>
                    {request.title}
                </Typography>
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
