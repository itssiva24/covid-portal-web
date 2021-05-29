import { useContext, useEffect, useState, useCallback } from "react";

import RequestsContext from "../contexts/requestsContext";
import { debounce } from "@material-ui/core";

const useGetRequestsQuery = (filters) => {
    const { requests, fetchNextRequests } = useContext(RequestsContext);
    const [currentDocs, setCurrentDocs] = useState([]);
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
    }, [filters]);

    const handleScroll = debounce(() => {
        fetchResult();
    }, 250);

    useEffect(() => {
        const result = requests[`${filters}`];
        if (!result) {
            fetchResult();
            return;
        }
        const { pages, hasMore, docs } = result;

        console.log({ pages, docs });
        if (!docs) {
            return;
        }
        setCurrentDocs(docs);
        sethasMore(hasMore);
        if (hasMore && docs.length < 10) {
            fetchResult();
        }
    }, [requests]);

    return {
        docs:currentDocs,
        hasMore,
        loading,
        handleScroll,
        error,
    };
};
export default useGetRequestsQuery;
