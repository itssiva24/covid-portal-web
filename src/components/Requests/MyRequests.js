import { useContext } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import Loader from "../Loader";
import * as ROUTES from "../../constants/routes";
import { Typography } from "@material-ui/core";
import useGetMyRequest from "../../hooks/useGetMyRequest";
import { makeStyles } from "@material-ui/core/styles";

const condition = (authUser) => !!authUser;

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

    const { myRequests, fetched } = useGetMyRequest(authUser.uid);

    if (!fetched)
        return (
            <div className={classes.root}>
                <Loader />;
            </div>
        );
    else {
        if (myRequests.length > 0) {
            return myRequests.map((req) => (
                <Request request={req} key={req.id} />
            ));
        } else {
            <Typography component="h4" variant="h6" align="center">
                No requests made yet!
            </Typography>;
        }
    }
});
