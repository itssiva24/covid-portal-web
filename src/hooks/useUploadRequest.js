import firebase from "firebase";
import { useReducer } from "react";
import { firestore } from "../contexts/firebase";

const useUploadRequest = (authUser) => {
  const [requestForm, setRequestForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      description: "",
      city: "",
      state: "",
      file: ""
    }
  );

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setRequestForm({ [name]: newValue });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      var fileURL = "";
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
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
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
                fileURL = downloadURL;
              });
          }
        );
      }

      await createRequest(fileURL);

      console.log(requestForm);
    } catch (err) {
      console.log(err);
    }
  };

  const createRequest = async (url) => {
    console.log("enter");
    const date = new Date();
    const requestRef = firestore.collection("requests").doc();

    await requestRef.set({
      id: requestRef.id,
      title: requestForm.title,
      ...(requestForm.description, { description: requestForm.description }),
      city: requestForm.city,
      state: requestForm.state,
      file: url,
      createdAt: date.getTime(),
      resolved: false,
      createdBy: authUser.email
    });
  };

  const handleFile = (files) => {
    setRequestForm({ file: files[0] });
  };

  return { requestForm, setRequestForm, handleFile, handleInput, handleSubmit };
};

export default useUploadRequest;
