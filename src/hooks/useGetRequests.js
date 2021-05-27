import { useContext, useEffect, useState } from "react";

import RequestsContext from "../contexts/requestsContext";
import { debounce } from "@material-ui/core";

const useGetRequestsQuery = (filters) => {
    const { requests, fetchNextRequests } = useContext(RequestsContext);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, sethasMore] = useState(true);

    const fetchResult = () => {
        setLoading(true);
        try {
            fetchNextRequests(filters);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    const handleScroll = debounce(() => {
        fetchResult();
    }, 250);

    useEffect(() => {
        console.log("checking");
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
    }, [requests]);

    return {
        docs,
        hasMore,
        loading,
        handleScroll,
        error,
    };
};
export default useGetRequestsQuery;
