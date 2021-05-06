import { useState, useEffect } from "react";
import { firestore } from "../contexts/firebase";

const useGetMyRequest = (uid) => {
    const [myRequests, setMyRequests] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        try {
            const requestsRef = firestore
                .collection("requests")
                .where("createdById", "==", uid)
                .onSnapshot((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        doc.exists && data.push(doc.data());
                    });

                    setMyRequests(data);
                    setFetched(true);
                });

            return () => requestsRef;
        } catch (err) {
            setFetched(true);
            console.log("Error in getting request assigned", err);
        }
    }, [uid]);

    return { fetched, myRequests };
};

export default useGetMyRequest;
