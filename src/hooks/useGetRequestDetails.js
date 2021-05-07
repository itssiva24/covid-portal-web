import { useState, useEffect } from "react";
import { firestore } from "../contexts/firebase";

const useGetRquestDetails = (id) => {
    const [request, setRequest] = useState({});
    const [openAssignVolunteerModal, setOpenAssignVolnteerModal] = useState(
        false
    );
    const [openResolveRequestModal, setOpenResolveRequestModal] = useState(
        false
    );
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        try {
            const requestsRef = firestore
                .collection("requests")
                .doc(id)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        setRequest(snapshot.data());
                    }

                    setFetched(true);
                });

            return () => requestsRef;
        } catch (err) {
            setFetched(true);
            console.log("Error in getting request assigned", err);
        }
    }, [id]);

    function toDateTime(secs) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const t = new Date(0); // Epoch
        t.setMilliseconds(secs);
        return t.toLocaleString("en-UK", options);
    }

    const handleClose = () => {
        setOpenAssignVolnteerModal(false);
        setOpenResolveRequestModal(false);
    };

    return {
        fetched,
        request,
        handleClose,
        toDateTime,
        openAssignVolunteerModal,
        openResolveRequestModal,
        setOpenAssignVolnteerModal,
        setOpenResolveRequestModal,
    };
};

export default useGetRquestDetails;
