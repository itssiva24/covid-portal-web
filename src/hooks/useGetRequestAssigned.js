import { useState, useEffect } from "react";
import { firestore } from "../contexts/firebase";

const useGetRequestAssigned = (uid) => {
    const [requestsAssigned, setRequestsAssigned] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        try {
            const requestsRef = firestore
                .collection("requests")
                .where("assignedTo", "==", uid)
                .onSnapshot((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        doc.exists && data.push(doc.data());
                    });

                    setRequestsAssigned(data);
                    setFetched(true);
                });

            return () => requestsRef;
        } catch (err) {
            setFetched(true);
            console.log("Error in getting request assigned", err);
        }
    }, [uid]);

    return { fetched, requestsAssigned };
};

export default useGetRequestAssigned;
