import firebase from "firebase";
import { useReducer, useState } from "react";
import { firestore } from "../contexts/firebase";

const useUploadRequest = (authUser) => {
    const [requestForm, setRequestForm] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            title: "",
            description: "",
            city: "",
            state: "",
            file: "",
        }
    );

    const [uploading, setUploading] = useState(false);
    const [percentageDone, setPercentageDone] = useState(0);

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRequestForm({ [name]: newValue });
    };

    const handleSubmit = async (evt) => {
        try {
            setUploading(true);
            evt.preventDefault();
            if (requestForm.file) {
                const uploadTask = firebase
                    .storage()
                    .ref(`requests/${requestForm.file.name}`)
                    .put(requestForm.file);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        setPercentageDone(progress);
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log("Upload is paused");
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log("Upload is running");
                                break;
                            default:
                                console.log("Error");
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log("Unsuccessful upload", error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(async (downloadURL) => {
                                await createRequest(downloadURL);
                            });
                    }
                );
            } else await createRequest("");

            setRequestForm({
                title: "",
                description: "",
                city: "",
                state: "",
                file: "",
            });
            setUploading(false);
        } catch (err) {
            setUploading(false);
            console.log(err);
        }
    };

    const createRequest = async (url) => {
        const requestRef = firestore.collection("requests").doc();

        await requestRef.set({
            id: requestRef.id,
            title: requestForm.title,
            ...(requestForm.description,
            { description: requestForm.description }),
            city: requestForm.city,
            state: requestForm.state,
            file: url,
            createdAt: Date.now(),
            resolved: false,
            createdBy: authUser.displayName,
            createdByUd: authUser.uid,
            email: authUser.email,
            imageUrl: authUser.photoURL,
        });
    };

    const handleFile = (files) => {
        setRequestForm({ file: files[0] });
    };

    return {
        requestForm,
        setRequestForm,
        handleFile,
        handleInput,
        handleSubmit,
        uploading,
        percentageDone,
    };
};

export default useUploadRequest;
