import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Button,
    Link,
    Typography,
    Avatar,
    CircularProgress,
    makeStyles,
} from "@material-ui/core";
import { getRequest } from "../../contexts/firebase";
import AuthUserContext, { withAuthorization } from "../../contexts";
import { UserRole } from "../../utils";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles({
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
    imageBox: {
        textAlign: "center",
        margin: 8,
    },
    image: {
        maxWidth: 480,
        height: "auto",
    },

    footer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
});

const condition = (authUser) => !!authUser;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const { id } = useParams();
    const classes = useStyles();
    const [request, setRequest] = useState({});
    const { authUser, me } = useContext(AuthUserContext);

    useEffect(() => {
        const getRequestData = async (id) => {
            const data = await getRequest(id);
            setRequest(data);
        };

        getRequestData(id);
    }, []);

    function toDateTime(secs) {
        var t = new Date(0); // Epoch
        t.setMilliseconds(secs);
        return t.toLocaleString();
    }
    console.log(request);

    return request ? (
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
                    {request.description ? `${request.description}` : ""}
                </Typography>
            </Box>
            {request.file && (
                <Box className={classes.imageBox}>
                    <img src={request.file} className={classes.image} />
                </Box>
            )}
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
                {!request.assignedTo && me.role === UserRole.Admin && (
                    <Button variant="contained" color="secondary" size="small">
                        Assign Volunteer
                    </Button>
                )}
                {request.assignedTo &&
                    !request.resolved &&
                    request.assignedTo === me.uid && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Resolve request
                        </Button>
                    )}
            </Box>
        </Container>
    ) : (
        <CircularProgress />
    );
});
