import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Button,
    Typography,
    Avatar,
    makeStyles,
} from "@material-ui/core";
import AuthUserContext, { withAuthorization } from "../../contexts";
import { UserRole } from "../../utils";
import * as ROUTES from "../../constants/routes";
import AssignVolunteerDialog from "../AssignVolunteer";
import Loader from "../Loader";
import { ResolveRequestDialog } from "../Requests";
import useGetRquestDetails from "../../hooks/useGetRequestDetails";
import PayDialog from "./PayDialog";

export const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.grey[800],
        padding: "20px",
        margin: "16px auto",
        borderRadius: 8,
        "&:hover": {
            background: theme.palette.grey[700],
        },
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "0.2em 1em",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    avatar: {
        height: "32px",
        width: "32px",
    },
    headerText: {
        flex: "1",
        fontSize: 16,
        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
        },
    },
    messageBox: {
        padding: "16px 0 24px",
    },
    title: {
        color: theme.palette.grey[200],
    },
    imageBox: {
        textAlign: "center",
        margin: 8,
    },
    image: {
        maxWidth: 480,
        height: "auto",
        [theme.breakpoints.down("xs")]: {
            maxWidth: 270,
        },
    },

    footer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
}));

const condition = (authUser) => !!authUser;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)((props) => {
    const { id } = useParams();
    const classes = useStyles();
    const { authUser } = useContext(AuthUserContext);

    const {
        request,
        openAssignVolunteerModal,
        openPayModal,
        openResolveRequestModal,
        handleClose,
        fetched,
        toDateTime,
        setOpenAssignVolnteerModal,
        setOpenResolveRequestModal,
        setOpenPayModal,
    } = useGetRquestDetails(id);

    console.log(request);
    if (!fetched) return <Loader />;
    else
        return Object.keys(request).length !== 0 ? (
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
                        <Typography
                            variant="body3"
                            className={classes.headerText}
                        >
                            {toDateTime(request.createdAt)}
                        </Typography>
                    </div>
                </Box>
                <Box className={classes.messageBox}>
                    <Typography variant="h6">{request.title}</Typography>
                    <Typography variant="body2">
                        {request.description ? `${request.description}` : ""}
                    </Typography>
                </Box>
                <Box className={classes.imageBox}>
                    <img
                        src={request.proofImageURL}
                        className={classes.image}
                        alt=""
                    />
                </Box>
                {request.type === "Monetary" && (
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setOpenPayModal(true);
                            }}
                        >
                            Donate Money
                        </Button>
                    </Box>
                )}
                <Box className={classes.footer}>
                    <Button variant="outlined" color="primary" size="small">
                        {request.state === "" ? "State N/A" : request.state}
                    </Button>
                    <Button
                        variant="outlined"
                        color={request.resolved ? "primary" : "secondary"}
                        size="small"
                    >
                        {request.resolved ? "Resolved" : "Not Resolved"}
                    </Button>
                    {!request.assignedTo && authUser.role === UserRole.Admin && (
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => setOpenAssignVolnteerModal(true)}
                        >
                            Assign Volunteer
                        </Button>
                    )}
                    {!request.resolved &&
                        request.assignedTo &&
                        request.assignedTo === authUser.uid && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => setOpenResolveRequestModal(true)}
                            >
                                Resolve request
                            </Button>
                        )}
                    {!request.resolved &&
                        request.assignedTo &&
                        request.assignedTo !== authUser.uid && (
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                            >
                                ASSIGNED
                            </Button>
                        )}
                    <AssignVolunteerDialog
                        id={id}
                        open={openAssignVolunteerModal}
                        handleClose={handleClose}
                    />
                    <ResolveRequestDialog
                        id={id}
                        open={openResolveRequestModal}
                        handleClose={handleClose}
                    />
                    {request.type === "Monetary" && (
                        <PayDialog
                            request={request}
                            open={openPayModal}
                            handleClose={handleClose}
                        />
                    )}
                </Box>
            </Container>
        ) : (
            <Loader />
        );
});
