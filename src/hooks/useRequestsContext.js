import { useState, useEffect, useRef } from "react";
import { firestore } from "../contexts/firebase";
const getRequestsQuery = (filters) => {
    const q = firestore.collection("requests");
    return filters.reduce((p, c) => p.where(...c), q);
};

const timeInterval = 7 * 24 * 60 * 60 * 1000;
const firstRequestTimestamp = 1620923249680;

export default function useRequestsContext() {
    const [requests, setRequests] = useState({});
    const listeners = useRef([]);

    //  clears all listeners when provider unmounts
    useEffect(
        () => () => {
            listeners.current.forEach((l) => {
                l();
            });
            // console.log(
            //     "unsubscribing all listeners",
            //     listeners.current.length
            // );
        },
        []
    );

    const attachRequestsListener = (
        filters,
        pageNo,
        startTimestamp,
        endTimestamp
    ) => {
        // console.log("attaching listener", {
        //     filters,
        //     pageNo,
        //     startTimestamp,
        //     endTimestamp,
        // });
        const listener = getRequestsQuery(filters)
            .orderBy("createdAt", "desc")
            .startAfter(startTimestamp)
            .endAt(endTimestamp)
            .onSnapshot((snapshot) => {
                const updatedPage = snapshot.docs.map((doc) => doc.data());
                setRequests((prev) => {
                    const prevResult = prev[`${filters}`];
                    const prevPages = prevResult?.pages;
                    const nextPages = prevPages.map((page, i) => {
                        return i === pageNo ? updatedPage : page;
                    });
                    return {
                        ...prev,
                        [`${filters}`]: {
                            ...prevResult,
                            pages: nextPages,
                            docs: nextPages.flat(),
                        },
                    };
                });
            });
        // console.log("attached listener");
        return listener;
    };

    // useEffect(() => {
    //     console.log({ requests });
    // }, [requests]);

    const fetchNextRequests = (filters) => {
        const result = requests[`${filters}`];
        const pageNo = result?.pages?.length ?? 0;
        const startTimestamp = result?.lastTimestamp ?? 253402300799999;
        const endTimestamp = result?.lastTimestamp
            ? startTimestamp - timeInterval
            : Date.now() - timeInterval;
        const hasMore = result?.hasMore;
        if (hasMore === false) return;

        setRequests((prev) => {
            const prevResult = prev[`${filters}`];
            const prevPages = prevResult?.pages;
            return {
                ...prev,
                [`${filters}`]: {
                    ...prevResult,
                    pages: pageNo === 0 ? [[]] : [...prevPages, []],
                    lastTimestamp: endTimestamp,
                    hasMore: endTimestamp > firstRequestTimestamp,
                },
            };
        });
        // console.log({ startTimestamp, endTimestamp, pageNo });
        const lstnr = attachRequestsListener(
            filters,
            pageNo,
            startTimestamp,
            endTimestamp
        );
        listeners.current = listeners.current.concat([lstnr]);
        // setListeners((prev) => [...prev, listener]);
    };

    return { requests, fetchNextRequests };
}
