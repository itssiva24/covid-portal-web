import { useState } from "react";
import { firestore } from "../contexts/firebase";

const useResolveRequest = (id, handleClose) => {
    const [loading, setLoading] = useState(false);

    const resolveRequest = async (id) => {
        const requestRef = firestore.doc(`requests/${id}`);

        try {
            await requestRef.update({
                resolved: true,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await resolveRequest(id);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        handleClose();
    };

    return { handleSubmit, loading };
};

export default useResolveRequest;
