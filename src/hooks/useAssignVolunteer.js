import { useState, useEffect } from "react";
import { firestore } from "../contexts/firebase";
import { UserRole } from "../utils";

const useAssignVolunteer = (id, handleClose) => {
    const [volunteer, setVolunteer] = useState("");
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);

    const assignVolunteer = async (id, requestId) => {
        if (!id) return null;

        try {
            const userSnapshot = await firestore.doc(`users/${id}`).get();

            if (!userSnapshot.exists) return;

            const requestRef = firestore.doc(`requests/${requestId}`);
            return await requestRef.set(
                {
                    assignedTo: id,
                },
                { merge: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            const getVolunteersData = async () => {
                const volunteerRef = await firestore
                    .collection("users")
                    .where("role", "==", UserRole.Volunteer)
                    .get();

                const local_volunteers = [];
                for (const doc of volunteerRef.docs) {
                    doc.exists &&
                        local_volunteers.push({ id: doc.id, ...doc.data() });
                }

                setVolunteers(local_volunteers);
            };
            getVolunteersData();
        } catch (err) {
            console.log("Error in getting volunteers", err);
        }
    }, [id]);

    const handleChange = (event) => {
        setVolunteer(event.target.value);
    };

    const handleSubmit = async () => {
        if (!volunteer) return;

        try {
            setLoading(true);
            await assignVolunteer(volunteer, id);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        handleClose();
        setVolunteer("");
    };
    return { volunteer, volunteers, handleChange, handleSubmit, loading };
};

export default useAssignVolunteer;
