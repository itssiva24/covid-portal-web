import { useContext, useEffect, useState } from "react";
import { Request } from ".";
import AuthUserContext, { withAuthorization } from "../../contexts";
import Loader from "../Loader";
import * as ROUTES from "../../constants/routes";
import { getMyRequests } from "../../contexts/firebase";
import { Typography } from "@material-ui/core";
const condition = (authUser) => !!authUser;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const [myRequests, setMyRequests] = useState();

    const { authUser } = useContext(AuthUserContext);

    useEffect(() => {
        const getMyRequestsData = async () => {
            if (authUser) {
                const data = await getMyRequests(authUser.uid);
                setMyRequests(data);
            }
        };

        getMyRequestsData();
    }, [authUser]);

    return typeof myRequests !== "undefined" && myRequests.length > 0 ? (
        myRequests.map((req) => <Request request={req} key={req.id} />)
    ) : (
        <Typography component="h4" variant="h6" align="center">
            No requests made yet
        </Typography>
    );
});
