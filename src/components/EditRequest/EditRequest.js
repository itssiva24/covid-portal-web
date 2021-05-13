import React, { useState, useContext } from "react";
import { firestore } from "../../contexts/firebase"
import {
    Button,
    TextField,
    Paper,
    Typography,
    LinearProgress,
} from "@material-ui/core";
import AuthUserContext from "../../contexts/authUserContext";
import useUploadRequest from "../../hooks/useUploadRequest";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "../newRequest/styles";
import states from "../../constants/states.json";
import cities from "../../constants/cities.json";
import UploadResultDialog from "../newRequest/UploadResultDialog";
import { REQUEST_TYPE } from "../../utils";

export default function EditRequest(props) {
    const classes = useStyles();

    const initialRequestState = props.location.request;

    const [recReq, setRecReq] = useState(initialRequestState)

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setRecReq({...recReq, [name]: newValue });
    };

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        console.log(recReq)
        const requestRef = await firestore.collection("requests").doc(recReq.id);
        await requestRef.set(recReq);
    }

    return(
         <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Edit Request
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 16,
                        }}
                    >
                        <InputLabel
                            id="demo-simple-select-label"
                            style={{
                                marginRight: 10,
                            }}
                            required
                        >
                            Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="requestType"
                            required
                            value={recReq.type}
                            style={{
                                flex: "1",
                            }}
                            onChange={handleInput}
                        >
                            <MenuItem value="Oxygen">Oxygen</MenuItem>
                            <MenuItem value={REQUEST_TYPE.Medical}>
                                {REQUEST_TYPE.Medical}
                            </MenuItem>
                            <MenuItem value={REQUEST_TYPE.Monetary}>
                                {REQUEST_TYPE.Monetary}
                            </MenuItem>
                        </Select>
                    </div>
                    <Typography
                        component="h5"
                        variant="h6"
                        className={classes.sectionHeader}
                    >
                        Request Details:
                    </Typography>
                    <TextField
                        label="Title"
                        placeholder="Keep it short"
                        id="outlined-basic"
                        required
                        multiline
                        name="title"
                        value={recReq.title}
                        className={classes.textField}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Description"
                        id="outlined-basic"
                        required
                        multiline
                        rows={10}
                        variant="outlined"
                        name="description"
                        className={classes.textField}
                        value={recReq.description}
                        onChange={handleInput}
                    />
                    {/* <div className={classes.address}>
                        <div className={classes.addressItem}>
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ marginRight: "10px" }}
                                required
                            >
                                State
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="state"
                                required
                                defaultValue={recReq.state}
                                onChange={handleInput}
                                style={{ flex: "1" }}
                            >
                                {Object.keys(states).map((key) => (
                                    <MenuItem value={key}>
                                        {states[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div> */}
                        {/* <div className={classes.addressItem}>
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ marginRight: "10px" }}
                                required
                            >
                                City
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="city"
                                required
                                value={recReq.city}
                                onChange={handleInput}
                                style={{ flex: "1" }}
                            >
                                {recReq.state &&
                                    cities[recReq.state].map((city) => (
                                        <MenuItem value={city}>{city}</MenuItem>
                                    ))}
                            </Select>
                        </div> */}
                    {/* </div> */}
                    {recReq.type && (
                        <>
                            <Typography
                                component="h5"
                                variant="h6"
                                className={classes.sectionHeader}
                            >
                                Patient Details:
                            </Typography>
                            <TextField
                                label="Name"
                                id="outlined-basic"
                                required
                                name="patientName"
                                value={recReq.patientName}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="Contact Number"
                                id="outlined-basic"
                                required
                                name="patientNumber"
                                value={recReq.patientNumber}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="SPO2 level"
                                id="outlined-basic"
                                required
                                name="patientSpo2Level"
                                type="number"
                                value={recReq.patientSpo2Level}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="CT Severity or CORADS Index"
                                id="outlined-basic"
                                name="patientCTSeverityOrCoradsIndex"
                                value={
                                    recReq.patientCTSeverityOrCoradsIndex
                                }
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="RT-PCR/PCR Test(if any)"
                                id="outlined-basic"
                                name="patientRTPCR"
                                value={recReq.patientRTPCR}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <Typography
                                component="h5"
                                variant="h6"
                                className={classes.sectionHeader}
                            >
                                Caregiver Details:
                            </Typography>
                            <TextField
                                label="Name"
                                id="outlined-basic"
                                required
                                name="caregiverName"
                                value={recReq.caregiverName}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="Contact Number"
                                id="outlined-basic"
                                required
                                name="caregiverNumber"
                                value={recReq.caregiverNumber}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                        </>
                    )}

                    {recReq.type === REQUEST_TYPE.Monetary && (
                        <>
                            <Typography
                                component="h5"
                                variant="h6"
                                className={classes.sectionHeader}
                            >
                                UPI Details:
                            </Typography>
                            <TextField
                                id="standard-basic"
                                name="recipientUPIID"
                                className={classes.textField}
                                label="Recipient UPI ID"
                                value={recReq.recipientUPIID}
                                onChange={handleInput}
                                required
                            />
                            <TextField
                                id="standard-basic"
                                name="recipientUPIName"
                                className={classes.textField}
                                label="Recipient Name "
                                value={recReq.recipientUPIName}
                                onChange={handleInput}
                                required
                            />
                            {/* <div className={classes.chooseFile}>
                                <label>UPI QR code Image: </label>
                                <input
                                    type="file"
                                    name="QRCodeImage"
                                    required
                                    // onChange={handleFile}
                                />
                            </div> */}
                        </>
                    )}
                    <div className={classes.chooseFile}>
                        <label>
                            {recReq.type !== REQUEST_TYPE.Monetary
                                ? "Image to support your request:"
                                : "Hospital bill or other relevant document: "}
                        </label>
                        <input
                            type="file"
                            name="proofImage"
                            // required
                            // onChange={handleFile}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>

                    {/* {uploading && (
                        <div className={classes.progress}>
                            <LinearProgress />
                        </div>
                    )} */}
                </form>
            </Paper>
            {/* <UploadResultDialog
                result={uploadResult}
                open={openUploadResultModal}
                handleClose={handleClose}
            ></UploadResultDialog> */}
        </div>
    )
}