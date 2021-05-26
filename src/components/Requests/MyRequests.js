import { useContext } from "react";
import AuthUserContext, { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import RequestsTypeTab from "../layouts/RequestsTypeTab";

const condition = (authUser) => !!authUser;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const { authUser } = useContext(AuthUserContext);

    const filters = [["createdById", "==", authUser.uid]];
    return <RequestsTypeTab filters={filters}></RequestsTypeTab>
});
