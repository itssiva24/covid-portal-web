import { useState, useContext } from "react";
import AuthUserContext from "../contexts";
import { firestore } from "../contexts/firebase";
import { UserRole } from "../utils";

const useRegisterAsAVolunteer = () => {
    const [email, setEmail] = useState("");
    const [hasAttended, setHasAttended] = useState(true);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { authUser } = useContext(AuthUserContext);

    const registerVolunteer = async () => {
        const userRef = firestore.doc(`users/${authUser.uid}`);

        try {
            await userRef.update({
                role: UserRole.Volunteer,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        else if (!hasAttended) {
            setMessage(
                "You must have to attend onboarding sessions to be a volunteer!"
            );
            return;
        } else if (email !== authUser.email) {
            setMessage("Enter your smail!");
            return;
        }

        setLoading(true);
        try {
            await registerVolunteer();

            setMessage("Registered Successfully, now refresh the page!");
        } catch (error) {
            setMessage("Sorry something went wrong, Try adding again");
            console.error(error);
        } finally {
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
        hasAttended,
        setHasAttended,
    };
};

export default useRegisterAsAVolunteer;
