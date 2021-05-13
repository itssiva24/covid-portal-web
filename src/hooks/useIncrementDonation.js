import { useState } from "react";
import { firestore } from "../contexts/firebase";
import firebase from "../contexts/firebase";

const useIncrementDonation = (id, moneyEntered) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const incrementDonation = async (id, moneyEntered) => {
        const requestRef = firestore.doc(`requests/${id}`);

        try {
            await requestRef.update({
                amountCollected:
                    firebase.firestore.FieldValue.increment(moneyEntered),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!moneyEntered) return;
        try {
            setLoading(true);
            await incrementDonation(id, moneyEntered);
            setSuccess(true);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return { handleSubmit, loading, success };
};

export default useIncrementDonation;
