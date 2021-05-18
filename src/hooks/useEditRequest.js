import firebase from "firebase";
import { useState } from "react";
import { firestore } from "../contexts/firebase";
import states from "../constants/states.json";
import { REQUEST_TYPE } from "../utils";

const useEditRequest = (initialRequestState) => {
    const [recReq, setRecReq] = useState({
        ...initialRequestState,
        state:
            Object.keys(states).filter(
                (key) => states[key] === initialRequestState.state
            )[0] || initialRequestState.state,
        requestType: initialRequestState.type,
    });

    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState({ proofImage: "", QRCodeImage: "" });
    const [uploadResult, setUploadResult] = useState("");
    const [openUploadResultModal, setOpenUploadResultModal] = useState(false);
    const [percentage, setPercentageDone] = useState(0);

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRecReq((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleFile = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.files[0];
        setFiles((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleClose = () => {
        setOpenUploadResultModal(false);
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

    const handleSubmit = async (evt) => {
        try {
            setUploading(true);
            evt.preventDefault();

            if (files.proofImage) {
                const proofUploadTask = firebase
                    .storage()
                    .ref()
                    .child(
                        `requests/${recReq.id}/proof/${files.proofImage.name}`
                    )
                    .put(files.proofImage);

                const handleSuccess = async () => {
                    const proofImageDownloadURL =
                        await proofUploadTask.snapshot.ref.getDownloadURL();

                    setRecReq((prev) => ({
                        ...prev,
                        proofImageURL: proofImageDownloadURL,
                    }));

                    if (
                        files.QRCodeImage &&
                        recReq.requestType === REQUEST_TYPE.Monetary
                    ) {
                        const qrcodeUploadTask = firebase
                            .storage()
                            .ref()
                            .child(
                                `requests/${recReq.id}/qr/${files.QRCodeImage.name}`
                            )
                            .put(files.QRCodeImage);

                        qrcodeUploadTask.on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            ...handleUploadParams(async () => {
                                const qrcodeImageDownloadURL =
                                    await qrcodeUploadTask.snapshot.ref.getDownloadURL();

                                setRecReq((prev) => ({
                                    ...prev,
                                    QRCodeURL: qrcodeImageDownloadURL,
                                }));

                                await updateRequest(
                                    proofImageDownloadURL,
                                    qrcodeImageDownloadURL
                                );
                                setUploading(false);
                                setUploadResult("Success");
                                setOpenUploadResultModal(true);
                            })
                        );
                    } else {
                        await updateRequest(proofImageDownloadURL);
                        setUploading(false);
                        setUploadResult("Success");
                        setOpenUploadResultModal(true);
                    }
                };

                proofUploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    ...handleUploadParams(handleSuccess)
                );
            }
        } catch (err) {
            setUploadResult("Error");
            setUploading(false);
            console.log("Error in updating request", err);
        }
    };

    const updateRequest = async (
        proofImageDownloadURL,
        qrcodeImageDownloadURL = ""
    ) => {
        await firestore
            .collection("requests")
            .doc(recReq.id)
            .set(
                {
                    ...recReq,
                    proofImageURL: proofImageDownloadURL,
                    QRCodeURL: qrcodeImageDownloadURL,
                    state: states[recReq.state],
                    type: recReq.requestType,
                },
                { merge: true }
            );
    };

    return {
        recReq,
        handleSubmit,
        handleInput,
        uploading,
        handleFile,
        uploadResult,
        openUploadResultModal,
        handleClose,
    };
};

export default useEditRequest;
