import { useState, useEffect, useContext } from "react";
import { firestore } from "../contexts/firebase";
import RequestsContexts from "../contexts/requestsContext";
import { UserRole } from "../utils";

const useAssignVolunteer = (id, handleClose, type) => {
    const [volunteer, setVolunteer] = useState({ name: "", id: "" });
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);

    // const { setFetched } = useContext(RequestsContexts);

    const assignVolunteer = async (id, name, requestId) => {
        if (!id) return null;

        try {
            const userSnapshot = await firestore.doc(`users/${id}`).get();

            if (!userSnapshot.exists) return;

            const requestRef = firestore.doc(`requests/${requestId}`);
            return await requestRef.set(
                {
                    assignedTo: id,
                    assignedToVolunteer: name,
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
        const vId = event.target.value;
        const { displayName: name, id } = volunteers.filter(
            (v) => v.id === vId
        )[0];
        setVolunteer({ name, id });
    };

    const handleSubmit = async () => {
        if (!volunteer.id || !volunteer.name) return;

        try {
            setLoading(true);
            await assignVolunteer(volunteer.id, volunteer.name, id);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        handleClose();
        setVolunteer("");
        // setFetched((prev) => ({ ...prev, [type.toLowerCase()]: false }));
    };
    return { volunteer, volunteers, handleChange, handleSubmit, loading };
};

export default useAssignVolunteer;
