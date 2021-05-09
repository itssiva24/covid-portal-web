import React, { useContext } from "react";
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
import useStyles from "./styles";
import states from "../../constants/states.json";
import cities from "../../constants/cities.json";
import UploadResultDialog from "./UploadResultDialog";

function NewRequest() {
    const classes = useStyles();
    const { authUser } = useContext(AuthUserContext);
    const {
        handleFile,
        requestForm,
        handleInput,
        handleSubmit,
        uploading,
        handleClose,
        uploadResult,
        openUploadResultModal,
    } = useUploadRequest(authUser);

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    New Request
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
                            value={requestForm.requestType}
                            style={{
                                flex: "1",
                            }}
                            onChange={handleInput}
                        >
                            {/* <MenuItem value="Oxygen">Oxygen</MenuItem> */}
                            <MenuItem value="Medical Help">
                                Medical Help
                            </MenuItem>
                            <MenuItem value="Monetary">Monetary</MenuItem>
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
                        id="outlined-basic"
                        required
                        multiline
                        name="title"
                        value={requestForm.title}
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
                        value={requestForm.description}
                        onChange={handleInput}
                    />
                    <div className={classes.address}>
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
                                value={requestForm.state}
                                onChange={handleInput}
                                style={{ flex: "1" }}
                            >
                                {Object.keys(states).map((key) => (
                                    <MenuItem value={key}>
                                        {states[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={classes.addressItem}>
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
                                value={requestForm.city}
                                onChange={handleInput}
                                style={{ flex: "1" }}
                            >
                                {requestForm.state &&
                                    cities[requestForm.state].map((city) => (
                                        <MenuItem value={city}>{city}</MenuItem>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    {requestForm.requestType && (
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
                                value={requestForm.patientName}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="Contact Number"
                                id="outlined-basic"
                                required
                                name="patientNumber"
                                value={requestForm.patientNumber}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="SPO2 level"
                                id="outlined-basic"
                                required
                                name="patientSpo2Level"
                                type="number"
                                value={requestForm.patientSpo2Level}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="CT Severity or CORADS Index"
                                id="outlined-basic"
                                name="patientCTSeverityOrCoradsIndex"
                                value={
                                    requestForm.patientCTSeverityOrCoradsIndex
                                }
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="RT-PCR/PCR Test(if any)"
                                id="outlined-basic"
                                name="patientRTPCR"
                                value={requestForm.patientRTPCR}
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
                                value={requestForm.caregiverName}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                            <TextField
                                label="Contact Number"
                                id="outlined-basic"
                                required
                                name="caregiverNumber"
                                value={requestForm.caregiverNumber}
                                className={classes.textField}
                                onChange={handleInput}
                            />
                        </>
                    )}

                    {requestForm.requestType === "Monetary" && (
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
                                onChange={handleInput}
                                required
                            />
                            <TextField
                                id="standard-basic"
                                name="recipientUPIName"
                                className={classes.textField}
                                label="Recipient Name "
                                onChange={handleInput}
                                required
                            />
                            <div className={classes.chooseFile}>
                                <label>UPI QR code Image: </label>
                                <input
                                    type="file"
                                    name="QRCodeImage"
                                    required
                                    onChange={handleFile}
                                />
                            </div>
                        </>
                    )}
                    <div className={classes.chooseFile}>
                        <label>
                            {requestForm.requestType !== "Monetary"
                                ? "Image to support your request:"
                                : "Hospital bill or other relevant document: "}
                        </label>
                        <input
                            type="file"
                            name="proofImage"
                            required
                            onChange={handleFile}
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

                    {uploading && (
                        <div className={classes.progress}>
                            <LinearProgress />
                        </div>
                    )}
                </form>
            </Paper>
            <UploadResultDialog
                result={uploadResult}
                open={openUploadResultModal}
                handleClose={handleClose}
            ></UploadResultDialog>
        </div>
    );
}

export default NewRequest;
