import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { firestore } from "../contexts/firebase";
import { REQUEST_TYPE } from "../utils";

const useFetchRequests = (fetched, setFetched) => {
    const requestType = [
        REQUEST_TYPE.Medical.toLowerCase(),
        REQUEST_TYPE.Monetary.toLowerCase(),
    ];
    const [request, setRequest] = useState({ medical: [], monetary: [] });
    const [lastDoc, setLastDoc] = useState({ medical: null, monetary: null });
    const [type, setType] = useState(requestType[0]);

    const handleChange = (e, val) => {
        setType(requestType[val]);
    };

    useEffect(() => {
        if (!fetched[type]) {
            try {
                const subscriber = firestore
                    .collection("requests")
                    .where("resolved", "==", false)
                    .where("type", "==", type.toUpperCase())
                    .orderBy("createdAt", "desc")
                    .limit(10)
                    .onSnapshot((querySnapshot) => {
                        const localRequest = [];

                        for (const doc of querySnapshot.docs) {
                            doc.exists && localRequest.push(doc.data());
                        }

                        querySnapshot
                            .docChanges()
                            .forEach((change) => console.log(change.type));

                        setRequest((prev) => ({
                            ...prev,
                            [type]: localRequest,
                        }));
                        setLastDoc((prev) => ({
                            ...prev,
                            [type]: querySnapshot.docs[
                                querySnapshot.docs.length - 1
                            ],
                        }));
                        setFetched((prev) => ({
                            ...prev,
                            [type]: true,
                        }));
                    });

                return () => subscriber();
            } catch (err) {
                console.log("Error in Fetching Request", err);
            }
        }
    }, [type]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMore = useCallback(
        debounce(async () => {
            try {
                if (lastDoc[type]) {
                    const nextDocuments = firestore
                        .collection("requests")
                        .where("resolved", "==", false)
                        .where("type", "==", type.toUpperCase())
                        .orderBy("createdAt", "desc")
                        .startAfter(lastDoc[type])
                        .limit(5)
                        .onSnapshot((querySnapshot) => {
                            const localRequest = [];

                            for (const doc of querySnapshot.docs) {
                                doc.exists && localRequest.push(doc.data());
                            }

                            setLastDoc((prev) => ({
                                ...prev,
                                [type]: querySnapshot.docs[
                                    querySnapshot.docs.length - 1
                                ],
                            }));

                            setRequest((prev) => {
                                return {
                                    ...prev,
                                    [type]: [...prev[type], ...localRequest],
                                };
                            });
                        });

                    return () => nextDocuments();
                }
            } catch (error) {
                console.log("error next page", error);
            }
        }, 40),
        [lastDoc[type]]
    );

    return {
        request,
        lastDoc,
        loadMore,
        type,
        setType,
        handleChange,
    };
};

export default useFetchRequests;
