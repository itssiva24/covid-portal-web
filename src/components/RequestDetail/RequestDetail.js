import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Button,
    Typography,
    Avatar,
    makeStyles,
    LinearProgress,
} from "@material-ui/core";
import AuthUserContext, { withAuthorization } from "../../contexts";
import { REQUEST_TYPE, UserRole } from "../../utils";
import * as ROUTES from "../../constants/routes";
import AssignVolunteerDialog from "../AssignVolunteer";
import Loader from "../Loader";
import { ResolveRequestDialog, UpdateCollectedAmountDialog } from "../Requests";
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
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginLeft: -8,
    },
    amountBox: {
        margin: "16px 0 0",
    },
    avatar: {
        height: "32px",
        width: "32px",
        marginLeft: 8,
    },
    headerText: {
        marginLeft: 8,
        flex: "1",
        fontSize: 16,
        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
        },
    },
    donateButton: {
        display: "block",
        margin: "10px auto 0",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
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
        marginLeft: -8,
        flexWrap: "wrap",
        "& button": {
            display: "block",
            marginLeft: 8,
            marginTop: 6,
        },
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
        openUpdateCollectedAmountModal,
        moneyEntered,
        handleClose,
        fetched,
        toDateTime,
        setOpenAssignVolnteerModal,
        setOpenResolveRequestModal,
        setOpenPayModal,
        setOpenUpdateCollectedAmountModal,
        setMoneyEntered,
    } = useGetRquestDetails(id);

    const editRedirect = {
        pathname: `/request/${request.id}/edit`,
        request,
    };
    if (!fetched) return <Loader />;
    else
        return Object.keys(request).length !== 0 ? (
            <>
                <Container maxWidth="sm" className={classes.root}>
                    <Box className={classes.header}>
                        <Avatar
                            className={classes.avatar}
                            alt={`${request.createdBy}`}
                            src={request.imageUrl}
                        ></Avatar>
                        <Typography
                            variant="body3"
                            className={classes.headerText}
                        >
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

                    {request.type === REQUEST_TYPE.Monetary && (
                        <Box className={classes.amountBox}>
                            <LinearProgress
                                value={
                                    request.amountNeeded &&
                                    (request.amountCollected /
                                        request.amountNeeded) *
                                        100
                                }
                                variant="determinate"
                                style={{
                                    height: 8,
                                    borderRadius: 4,
                                    margin: "1px 0px 1px 4px",
                                }}
                            />
                            <Typography align="right">
                                &#x20B9;
                                {request.amountNeeded &&
                                    `${request.amountCollected.toLocaleString(
                                        "en-IN"
                                    )}/${request.amountNeeded.toLocaleString(
                                        "en-IN"
                                    )}`}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setOpenPayModal(true);
                                }}
                                className={classes.donateButton}
                            >
                                Donate Money
                            </Button>
                        </Box>
                    )}
                    <Box className={classes.messageBox}>
                        <Typography variant="h6" style={{ marginBottom: 8 }}>
                            {request.title}
                        </Typography>

                        <Typography variant="body3">
                            Patient Name:&nbsp;
                            {request.patientName
                                ? `${request.patientName}`
                                : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            Patient Number:&nbsp;
                            {request.patientNumber
                                ? `${request.patientNumber}`
                                : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            City:&nbsp;
                            {request.city ? `${request.city}` : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            SPO2 Level:&nbsp;
                            {request.patientSpo2Level
                                ? `${request.patientSpo2Level}`
                                : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            RT-PCR Test:&nbsp;
                            {request.patientRTPCR
                                ? `${request.patientRTPCR}`
                                : ""}
                            <br />
                        </Typography>
                        <Typography variant="body3">
                            CT Severity/CORADS Index:&nbsp;
                            {request.patientCTSeverityOrCoradsIndex
                                ? `${request.patientCTSeverityOrCoradsIndex}`
                                : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            Caregiver Name:&nbsp;
                            {request.caregiverName
                                ? `${request.caregiverName}`
                                : ""}
                        </Typography>
                        <br />
                        <Typography variant="body3">
                            Caregiver Number:&nbsp;
                            {request.caregiverNumber
                                ? `${request.caregiverNumber}`
                                : ""}
                        </Typography>
                        <br />
                        <br />

                        <Typography
                            variant="body1"
                            style={{ fontStyle: "italic" }}
                        >
                            {request.description
                                ? `${request.description}`
                                : ""}
                        </Typography>
                    </Box>
                    <Box className={classes.imageBox}>
                        <img
                            src={request.proofImageURL}
                            className={classes.image}
                            alt=""
                        />
                    </Box>
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
                        {request.createdById === authUser.uid ? (
                            <Button variant="outlined" size="small">
                                <Link
                                    to={editRedirect}
                                    style={{
                                        color: "grey",
                                        textDecoration: "none",
                                    }}
                                >
                                    Edit
                                </Link>
                            </Button>
                        ) : null}
                        {!request.assignedTo &&
                            authUser.role === UserRole.Admin && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={() =>
                                        setOpenAssignVolnteerModal(true)
                                    }
                                >
                                    Assign Volunteer
                                </Button>
                            )}
                        {!request.resolved &&
                            request.assignedTo &&
                            request.assignedTo === authUser.uid &&
                            request.type === REQUEST_TYPE.Monetary && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() =>
                                        setOpenUpdateCollectedAmountModal(true)
                                    }
                                >
                                    Update Amount
                                </Button>
                            )}
                        {!request.resolved &&
                            request.assignedTo &&
                            request.assignedTo === authUser.uid && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() =>
                                        setOpenResolveRequestModal(true)
                                    }
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
                            //type={request.type}
                        />
                        <ResolveRequestDialog
                            id={id}
                            open={openResolveRequestModal}
                            handleClose={handleClose}
                        />
                        {request.type === REQUEST_TYPE.Monetary && (
                            <>
                                <PayDialog
                                    request={request}
                                    open={openPayModal}
                                    handleClose={handleClose}
                                    moneyEntered={moneyEntered}
                                    setMoneyEntered={setMoneyEntered}
                                />
                                <UpdateCollectedAmountDialog
                                    id={id}
                                    open={openUpdateCollectedAmountModal}
                                    amount={request.amountCollected}
                                    handleClose={handleClose}
                                />
                            </>
                        )}
                    </Box>
                </Container>
            </>
        ) : (
            <Loader />
        );
});
