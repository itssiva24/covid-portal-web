import { useContext, useEffect, useState, useCallback } from "react";

import RequestsContext from "../contexts/requestsContext";
import { debounce } from "@material-ui/core";

const useGetRequestsQuery = (filters) => {
    const { requests, fetchNextRequests } = useContext(RequestsContext);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, sethasMore] = useState(true);

    const fetchResult = useCallback(() => {
        setLoading(true);
        try {
            fetchNextRequests(filters);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }, [filters, fetchNextRequests]);

    const handleScroll = debounce(() => {
        fetchResult();
    }, 250);

    useEffect(() => {
        const result = requests[`${filters}`];
        if (!result) {
            fetchResult();
            return;
        }
        const { pages, hasMore } = result;
        const currentDocs = pages.flat();
        setDocs(currentDocs);
        if (currentDocs.length < 10) {
            fetchResult();
        }
        sethasMore(hasMore);
    }, [requests, fetchResult, filters]);

    return {
        docs,
        hasMore,
        loading,
        handleScroll,
        error,
    };
};
export default useGetRequestsQuery;
