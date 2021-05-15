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
    const [percentage, setPercentageDone] = useState(0);

    const handleInput = (evt) => {
        console.log(evt.target.name, evt.target.value);
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRecReq({ ...recReq, [name]: newValue });
    };

    const handleFile = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.files[0];
        setFiles({ ...files, [name]: newValue });
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
                        `requests/${recReq.email}/proof/${files.proofImage.name}`
                    )
                    .put(files.proofImage);

                const handleSuccess = async () => {
                    const proofImageDownloadURL =
                        await proofUploadTask.snapshot.ref.getDownloadURL();

                    setRecReq({
                        ...recReq,
                        proofImageURL: proofImageDownloadURL,
                    });

                    if (
                        files.QRCodeImage &&
                        recReq.requestType === REQUEST_TYPE.Monetary
                    ) {
                        const qrcodeUploadTask = firebase
                            .storage()
                            .ref()
                            .child(
                                `requests/${recReq.email}/qr/${files.QRCodeImage.name}`
                            )
                            .put(recReq.QRCodeImage);

                        qrcodeUploadTask.on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            ...handleUploadParams(async () => {
                                const qrcodeImageDownloadURL =
                                    await qrcodeUploadTask.snapshot.ref.getDownloadURL();

                                setRecReq({
                                    ...recReq,
                                    QRCodeURL: qrcodeImageDownloadURL,
                                });
                            })
                        );
                    }
                };

                proofUploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    ...handleUploadParams(handleSuccess)
                );
            }

            await updateRequest();
            setUploading(false);
        } catch (err) {
            console.log("Error in updating request", err);
        }
    };

    const updateRequest = async () => {
        await firestore
            .collection("requests")
            .doc(recReq.id)
            .set({
                ...recReq,
                state: states[recReq.state],
                type: recReq.requestType,
            });
    };

    return { recReq, handleSubmit, handleInput, uploading, handleFile };
};

export default useEditRequest;
