import { useState, useEffect } from "react";
import { firestore } from "../contexts/firebase";
import firebase from "../contexts/firebase";
import QRCode from "qrcode";

const useIncrementDonation = (request, moneyEntered) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageDataURL, setImageDataURL] = useState();

    const UPIURL = `upi://pay?pa=${request.recipientUPIID}&pn=${request.recipientUPIName}&cu=INR`;

    useEffect(() => {
        QRCode.toDataURL(
            UPIURL,
            {
                width: 256,
                margin: 4,
            }
        ).then((url) => {
            setImageDataURL(url);
        });
    }, [request]);

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
            await incrementDonation(request.id, moneyEntered);
            setSuccess(true);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return { handleSubmit, loading, success, UPIURL, imageDataURL };
};

export default useIncrementDonation;
