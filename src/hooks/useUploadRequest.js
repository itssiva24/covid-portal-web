import firebase from "firebase";
import { useReducer, useState } from "react";
import { firestore } from "../contexts/firebase";
import states from "../constants/states.json";
import { REQUEST_TYPE } from "../utils";

const initialRequestFormState = {
    title: "",
    description: "",
    city: "",
    state: "",
    proofImages: undefined,
    requestType: "",
    recipientUPIID: "",
    recipientUPIName: "",
    QRCodeImage: "",
    requirement: "",
};

const getFileDownloadURL = (file, user) => {
    return firebase
        .storage()
        .ref()
        .child(`${user.email}/${file.name}_${Date.now()}`)
        .put(file)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => url);
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
    const [newRequestId, setNewRequestId] = useState();

    const handleClose = () => {
        setOpenUploadResultModal(false);
    };

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRequestForm({ [name]: newValue });
    };
    const handleFile = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.files;
        console.log({ name, newValue });
        setRequestForm({ [name]: newValue });
    };
    const handleFileUpload = (file, i, n) => {
        return getFileDownloadURL(file, authUser).then((url) => {
            setPercentageDone((i / (n + 1)) * 100);
            return url;
        });
    };
    const getArrayFromFileList = (fileList) => {
        const n = fileList.length;
        const array = [];

        for (let i = 0; i < n; i++) {
            array.push(fileList.item(i));
        }
        return array;
    };
    const createRequest = async (proofImageDownloadURLs) => {
        const requestRef = firestore.collection("requests").doc();

        await requestRef.set({
            id: requestRef.id,
            title: requestForm.title,
            ...(requestForm.description,
            { description: requestForm.description }),
            email: authUser.email,
            createdBy: authUser.displayName,
            createdById: authUser.uid,
            imageUrl: authUser.photoURL,
            createdAt: Date.now(),
            type: requestForm.requestType,
            requirement: requestForm.requirement || "",
            state: states[requestForm.state],
            city: requestForm.city,
            patientName: requestForm.patientName,
            patientNumber: requestForm.patientNumber,
            patientSpo2Level: requestForm.patientSpo2Level,
            patientCTSeverityOrCoradsIndex:
                requestForm.patientCTSeverityOrCoradsIndex || "",
            patientRTPCR: requestForm.patientRTPCR || "",
            caregiverName: requestForm.caregiverName,
            caregiverNumber: requestForm.caregiverNumber,
            recipientUPIID: requestForm.recipientUPIID,
            recipientUPIName: requestForm.recipientUPIName,
            amountNeeded: parseInt(requestForm.amountNeeded),
            amountCollected: 0,
            // QRCodeURL: qrcodeImageDownloadURL,
            proofImageURLs: proofImageDownloadURLs,
            resolved: false,
        });
        return requestRef.id;
    };

    const handleSubmit = async (evt) => {
        try {
            setUploading(true);
            evt.preventDefault();
            const n = requestForm.proofImages.length;
            const proofImageURLs = await Promise.all(
                new Array(n)
                    .fill(null)
                    .map((_, i) =>
                        handleFileUpload(requestForm.proofImages.item(i), i, n)
                    )
            );
            const id = await createRequest(proofImageURLs);
            setNewRequestId(id);
            setUploading(false);
            setUploadResult("Success");
            setOpenUploadResultModal(true);
            setRequestForm(initialRequestFormState);
        } catch (err) {
            setUploadResult("Error");
            setUploading(false);
            console.log(err);
        }
    };

    return {
        newRequestId,
        getArrayFromFileList,
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
