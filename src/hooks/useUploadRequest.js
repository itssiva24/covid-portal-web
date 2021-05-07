import firebase from "firebase";
import { useReducer, useState } from "react";
import { firestore } from "../contexts/firebase";


const initialRequestFormState = {
    title: "",
    description: "",
    city: "",
    state: "",
    proofImage: "",
    requestType:"",
    recipentUPIID:"",
    recipentUPIName:"",
    QRCodeImage:""
}

const useUploadRequest = (authUser) => {
    const [requestForm, setRequestForm] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialRequestFormState
    );

    const [uploading, setUploading] = useState(false);
    const [percentageDone, setPercentageDone] = useState(0);

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        console.log({[name]:newValue})
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
            } else await createRequest();

            setRequestForm(initialRequestFormState);
            setUploading(false);
        } catch (err) {
            setUploading(false);
            console.log(err);
        }
    };

    const createRequest = async (proof, qr) => {
        const requestRef = firestore.collection("requests").doc();

        await requestRef.set({
            id: requestRef.id,
            title: requestForm.title,
            ...(requestForm.description,
            { description: requestForm.description }),
            type:requestForm.requestType,
            QRCodeURL: qr,
            UPIID:requestForm.UPIID,
            city: requestForm.city,
            state: requestForm.state,
            proofImageURL: proof,
            createdAt: Date.now(),
            resolved: false,
            createdBy: authUser.displayName,
            email: authUser.email,
        });
    };

    const handleFile = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.files[0];
        setRequestForm({ [name]: newValue });
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
