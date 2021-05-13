import { useState } from "react";
import { firestore } from "../contexts/firebase";

const useUpdateCollectedAmount = (id, amountCollected, handleClose) => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(amountCollected);

    const updateCollectedAmount = async (id, amount) => {
        const requestRef = firestore.doc(`requests/${id}`);

        try {
            await requestRef.update({
                amountCollected: parseInt(amount),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount) return;
        try {
            setLoading(true);
            await updateCollectedAmount(id, amount);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        handleClose();
    };

    return { handleSubmit, loading, handleChange };
};

export default useUpdateCollectedAmount;
