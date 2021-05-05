import { useContext, useEffect, useState } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import { getRequestsAssigned } from "../../contexts/firebase";
import { Typography } from "@material-ui/core";
import { UserRole } from "../../utils";
import { useHistory } from "react-router";
const condition = (authUser) =>
    !!authUser && authUser.role === UserRole.Volunteer;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const [requestsAssigned, setRequestsAssigned] = useState();

    const { authUser } = useContext(AuthUserContext);

    useEffect(() => {
        const getRequestsAssignedData = async () => {
            if (authUser) {
                await getRequestsAssigned(authUser.uid, setRequestsAssigned);
            }
        };
        getRequestsAssignedData();
    }, [authUser]);

    return typeof requestsAssigned !== "undefined" &&
        requestsAssigned.length > 0 ? (
        requestsAssigned.map((req) => <Request request={req} key={req.id} />)
    ) : (
        <Typography component="h4" variant="h6" align="center">
            No requests assigned yet
        </Typography>
    );
});
