import React from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CallMade } from "@material-ui/icons";
const useStyles = makeStyles({
    root: {
        backgroundColor: "white",
        borderBottom: "1px solid black",
        padding: "16px",
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
    },
    messageBox: {
        padding: "16px",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
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
                <Typography variant="h6" className={classes.name}>
                    {request.createdBy}
                </Typography>
                <Typography variant="body1">
                    {toDateTime(request.createdAt)}
                </Typography>
            </Box>
            <Box className={classes.messageBox}>
                <Typography variant="h5">{request.title}</Typography>
                <Typography variant="body1">{request.description}</Typography>
            </Box>
            <Box className={classes.footer}>
                <Button variant="outlined" color="primary" size="small">
                    {request.state == '' ? 'State N/A' : request.state}
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
                >
                    <Link style={{color: "#fff", textDecoration: "none"}} to={`/${request.id}`}>View Details</Link>
                </Button>
            </Box>
        </Container>
    );
}

export default Request;
