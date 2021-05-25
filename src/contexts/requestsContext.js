import React from "react";
import useRequestsContext from "../hooks/useRequestsContext";

const RequestsContext = React.createContext(null);

export const RequestsProvider = ({ children }) => {
    const { requests, fetchNextRequests } = useRequestsContext();
    return (
        <RequestsContext.Provider value={{ requests, fetchNextRequests }}>
            {children}
        </RequestsContext.Provider>
    );
};

export default RequestsContext;
