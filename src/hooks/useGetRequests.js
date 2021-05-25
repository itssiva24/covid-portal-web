import { useContext, useEffect, useState } from "react";

import RequestsContext from "../contexts/requestsContext";
import { debounce } from "@material-ui/core";

const useGetRequestsQuery = (filters) => {
  const { requests, fetchNextRequests } = useContext(RequestsContext);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    const result = requests[`${filters}`];
    if (!result) {
      fetchResult();
    }
  }, []);
  useEffect(() => {
    const result = requests[`${filters}`];
    if (!result) return;
    const { pages, hasMore } = result;
    setDocs(pages.flat());
    sethasMore(hasMore);
  }, [requests]);

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
  return {
    docs,
    hasMore,
    loading,
    handleScroll,
    error,
  };
};
export default useGetRequestsQuery;
