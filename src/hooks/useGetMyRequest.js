import { debounce } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import { firestore } from "../contexts/firebase";

const useGetMyRequest = (uid, type) => {
    const [myRequests, setMyRequests] = useState([]);
    const [lastDoc, setLastDoc] = useState();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        try {
            setFetched(false);
            const requestsRef = firestore
                .collection("requests")
                .where("createdById", "==", uid)
                .where("type", "==", type)
                .orderBy("createdAt", "desc")
                .limit(10)
                .onSnapshot((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        doc.exists && data.push(doc.data());
                    });

                    setMyRequests(data);
                    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
                    setFetched(true);
                });

            return () => requestsRef();
        } catch (err) {
            setFetched(true);
            console.log("Error in getting my request", err);
        }
    }, [uid, type]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMore = useCallback(
        debounce(async () => {
            try {
                if (lastDoc) {
                    const nextDocuments = firestore
                        .collection("requests")
                        .where("createdById", "==", uid)
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
                            setMyRequests((prev) => [...prev, ...localRequest]);
                        });

                    return () => nextDocuments();
                }
            } catch (error) {
                console.log("error next page", error);
            }
        }, 40),
        [lastDoc]
    );

    return { fetched, myRequests, loadMore, lastDoc };
};

export default useGetMyRequest;
