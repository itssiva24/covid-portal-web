import { useContext } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import { Typography } from "@material-ui/core";
import { UserRole } from "../../utils";
import useGetRequestAssigned from "../../hooks/useGetRequestAssigned";
import Loader from "../Loader";
import { makeStyles } from "@material-ui/core/styles";

const condition = (authUser) =>
    !!authUser && authUser.role === UserRole.Volunteer;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const { authUser } = useContext(AuthUserContext);
    const classes = useStyles();

    const { requestsAssigned, fetched } = useGetRequestAssigned(authUser.uid);

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />;
            </div>
        );
    else {
        if (requestsAssigned.length > 0) {
            return requestsAssigned.map((req) => (
                <Request request={req} key={req.id} />
            ));
        } else {
            <Typography component="h4" variant="h6" align="center">
                No requests assigned yet
            </Typography>;
        }
    }
});
