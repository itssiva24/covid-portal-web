import { useContext } from "react";
import AuthUserContext, { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import { UserRole } from "../../utils";

import RequestsTypeTab from "../layouts/RequestsTypeTab";

const condition = (authUser) =>
    !!authUser && authUser.role === UserRole.Volunteer;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const { authUser } = useContext(AuthUserContext);

    const filters = [["assignedTo", "==", authUser.uid]];
    return <RequestsTypeTab filters={filters}></RequestsTypeTab>
});
