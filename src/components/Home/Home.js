import React from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import RequestsTypeTab from "../layouts/RequestsTypeTab"

const condition = (authUser) => !!authUser;

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const filters = [["resolved", "==", false]];
    return <RequestsTypeTab filters={filters}></RequestsTypeTab>;
})