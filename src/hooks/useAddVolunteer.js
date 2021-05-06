import { useState } from "react";
import { firestore } from "../contexts/firebase";
import { UserRole } from "../utils";

const useAddVolunteer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const addVolunteer = async (email) => {
        if (!email) return null;

        try {
            await firestore
                .collection("users")
                .where("email", "==", email)
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach(async (doc) => {
                        const userRef = firestore.doc(`users/${doc.id}`);
                        await userRef.update({
                            role: UserRole.Volunteer,
                        });
                    });
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            return;
        }
        try {
            await addVolunteer(email.toLowerCase());
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        setMessage("Added Successfully!");
        setEmail("");
    };

    return { handleSubmit, loading, message, setEmail, email };
};

export default useAddVolunteer;
