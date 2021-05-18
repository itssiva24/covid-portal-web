import React, { createContext, useState } from "react";
import useFetchRequests from "../hooks/useFetchRequest";

const RequestsContexts = createContext({
    request: { medical: [], monetary: [] },
    fetched: { medical: false, monetary: [] },
    lastDoc: { medical: null, monetary: null },
    loadMore: null,
});

export const RequestsProvider = (props) => {
    const [fetched, setFetched] = useState({ medical: false, monetary: false });
    const { request, loadMore, lastDoc, type, handleChange } = useFetchRequests(
        fetched,
        setFetched
    );

    return (
        <RequestsContexts.Provider
            value={{
                request,
                fetched,
                lastDoc,
                loadMore,
                type,
                handleChange,
                setFetched,
            }}
        >
            {props.children}
        </RequestsContexts.Provider>
    );
};

export default RequestsContexts;
