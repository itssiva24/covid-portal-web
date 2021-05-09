import { useState, useReducer } from "react";
import { firestore } from "../contexts/firebase";
import { UserRole } from "../utils";

const useAddVolunteer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailList, dispatchEmailAction] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return state.add(action.value);
            case "remove":
                state.delete(action.value);
                return state;
            case "clear":
                state.clear();
                return state;
            default:
                return;
        }
    }, new Set());

    const addEmail = (email) => {
        if (!email) return;
        dispatchEmailAction({ type: "add", value: email });
    };
    const removeEmail = (email) => {
        dispatchEmailAction({ type: "remove", value: email });

        // do not remove below line
        setEmail(email);
    };
    const clearEmailList = () => {
        dispatchEmailAction({ type: "clear" });
    };

    const addVolunteers = async (emailList) => {
        if (!emailList) return null;

        try {
            await firestore
                .collection("users")
                .where("email", "in", emailList)
                .where("role", "!=", UserRole.Volunteer)
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
        if (!emailList.size) {
            return;
        }
        setLoading(true);
        try {
            const n = 10; // max elements in array firebase can support in one query
            const fullEmailList = [...emailList].map((e) =>
                e.toLowerCase().trim()
            );
            const steps = Math.ceil(fullEmailList.length / n);

            const updateRole = async (fullEmailList) => {
                for (let i = 0; i < steps; i++) {
                    await addVolunteers(
                        fullEmailList.splice(i * n, (i + 1) * n)
                    );
                }
            };

            updateRole(fullEmailList);

            setMessage("Added Successfully!");
        } catch (error) {
            setMessage("Sorry something went wrong, Try adding again");
            console.error(error);
        } finally {
            clearEmailList();
            setEmail("");
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        loading,
        message,
        setEmail,
        email,
        emailList,
        addEmail,
        removeEmail,
    };
};

export default useAddVolunteer;
