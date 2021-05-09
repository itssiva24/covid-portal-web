import firebase from "firebase";
import { useReducer, useState } from "react";
import { firestore } from "../contexts/firebase";

const initialRequestFormState = {
    title: "",
    description: "",
    city: "",
    state: "",
    proofImage: "",
    requestType: "",
    recipientUPIID: "",
    recipientUPIName: "",
    QRCodeImage: "",
};

const useUploadRequest = (authUser) => {
    const [requestForm, setRequestForm] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialRequestFormState
    );

    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState("");
    const [openUploadResultModal, setOpenUploadResultModal] = useState(false);
    const [percentageDone, setPercentageDone] = useState(0);

    const handleClose = () => {
        setOpenUploadResultModal(false);
        setUploadResult("");
    };

    const handleUploadParams = (onSuccess) => {
        return [
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                throw Error();
            },
            async () => {
                await onSuccess();
            },
        ];
    };

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRequestForm({ [name]: newValue });
    };

    const handleSubmit = async (evt) => {
        try {
            setUploading(true);
            evt.preventDefault();

            const proofUploadTask = firebase
                .storage()
                .ref()
                .child(`requests/proof/${requestForm.proofImage.name}`)
                .put(requestForm.proofImage);

            const handleSuccess = async () => {
                const proofImageDownloadURL = await proofUploadTask.snapshot.ref.getDownloadURL();

                if (requestForm.requestType === "Monetary") {
                    const qrcodeUploadTask = firebase
                        .storage()
                        .ref()
                        .child(
                            `requests/qrcode/${requestForm.QRCodeImage.name}`
                        )
                        .put(requestForm.QRCodeImage);
                    qrcodeUploadTask.on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        ...handleUploadParams(async () => {
                            const qrcodeImageDownloadURL = await qrcodeUploadTask.snapshot.ref.getDownloadURL();
                            await createRequest(
                                proofImageDownloadURL,
                                qrcodeImageDownloadURL
                            );
                        })
                    );
                } else {
                    await createRequest(proofImageDownloadURL);
                }
            };

            proofUploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                ...handleUploadParams(handleSuccess)
            );
            setRequestForm(initialRequestFormState);
            setUploadResult("Success");
            setUploading(false);
        } catch (err) {
            setUploadResult("Error");
            setUploading(false);
            console.log(err);
        } finally {
            setOpenUploadResultModal(true);
        }
    };

    const createRequest = async (
        proofImageDownloadURL,
        qrcodeImageDownloadURL = ""
    ) => {
        const requestRef = firestore.collection("requests").doc();

        await requestRef.set({
            id: requestRef.id,
            title: requestForm.title,
            ...(requestForm.description,
            { description: requestForm.description }),
            email: authUser.email,
            createdBy: authUser.displayName,
            createdById: authUser.uid,
            createdAt: Date.now(),
            type: requestForm.requestType,
            state: requestForm.state,
            city: requestForm.city,
            patientName: requestForm.patientName,
            patientNumber: requestForm.patientNumber,
            patientSpo2Level: requestForm.patientSpo2Level,
            patientCTSeverityOrCoradsIndex:
                requestForm.patientCTSeverityOrCoradsIndex,
            patientRTPCR: requestForm.patientRTPCR,
            caregiverName: requestForm.caregiverName,
            caregiverNumber: requestForm.caregiverNumber,
            recipientUPIID: requestForm.recipientUPIID,
            recipientUPIName: requestForm.recipientUPIName,
            QRCodeURL: qrcodeImageDownloadURL,
            proofImageURL: proofImageDownloadURL,
            resolved: false,
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
        handleClose,
        uploadResult,
        openUploadResultModal,
    };
};

export default useUploadRequest;
