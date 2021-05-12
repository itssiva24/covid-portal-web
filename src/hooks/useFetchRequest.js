import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { firestore } from "../contexts/firebase";

const useFetchRequests = (type) => {
    const [request, setRequest] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [lastDoc, setLastDoc] = useState();

    useEffect(() => {
        try {
            const subscriber = firestore
                .collection("requests")
                .where("resolved", "==", false)
                .where("type", "==", type)
                .orderBy("createdAt", "desc")
                .limit(10)
                .onSnapshot((querySnapshot) => {
                    const localRequest = [];

                    for (const doc of querySnapshot.docs) {
                        doc.exists && localRequest.push(doc.data());
                    }

                    setRequest(localRequest);
                    setLastDoc(
                        querySnapshot.docs[querySnapshot.docs.length - 1]
                    );
                    setFetched(true);
                });

            return () => subscriber();
        } catch (err) {
            console.log("Error in Fetching Request", err);
        }
    }, [type]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMore = useCallback(
        debounce(async () => {
            try {
                if (lastDoc) {
                    const nextDocuments = firestore
                        .collection("requests")
                        .where("resolved", "==", false)
                        .where("type", "==", type)
                        .orderBy("createdAt", "desc")
                        .startAfter(lastDoc)
                        .limit(5)
                        .onSnapshot((querySnapshot) => {
                            const localRequest = [];

                            for (const doc of querySnapshot.docs) {
                                doc.exists && localRequest.push(doc.data());
                            }

                            setLastDoc(
                                querySnapshot.docs[
                                    querySnapshot.docs.length - 1
                                ]
                            );
                            setRequest((prev) => [...prev, ...localRequest]);
                        });

                    return () => nextDocuments();
                }
            } catch (error) {
                console.log("error next page", error);
            }
        }, 40),
        [lastDoc]
    );

    return {
        request,
        fetched,
        lastDoc,
        loadMore,
    };
};

export default useFetchRequests;
