import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(5),
    },
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginTop: 20,
        width: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: 50,
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        [theme.breakpoints.up("xs")]: {
            padding: 30,
            width: "100%",
        },
        [theme.breakpoints.up("lg") && theme.breakpoints.up("md")]: {
            padding: 50,
            width: "auto",
        },
        borderRadius: 30,
        marginTop: 20,
    },
    address: {
        display: "flex",
        marginTop: 20,
        justifyContent: "space-between",
    },
    chooseFile: {
        margin: 20,
    },
    progress: {
        width: "100%",
        marginTop: 20,
    },
}));

function NewRequest() {
    const classes = useStyles();
    const { authUser } = useContext(AuthUserContext);

    const {
        handleFile,
        requestForm,
        handleInput,
        handleSubmit,
        uploading,
    } = useUploadRequest(authUser);

    console.log(requestForm);

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    New Request
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                        <TextField
                            label="City/Town"
                            id="outlined-basic"
                            required
                            multiline
                            name="city"
                            value={requestForm.city}
                            style={{ display: "flex", flex: 1 }}
                            onChange={handleInput}
                        />
                        <TextField
                            label="State"
                            id="outlined-basic"
                            required
                            multiline
                            name="state"
                            value={requestForm.state}
                            onChange={handleInput}
                            style={{ display: "flex", flex: 1, marginLeft: 10 }}
                        />
                    </div>
                    <InputLabel
                        id="demo-simple-select-label"
                        style={{ marginTop: "2em" }}
                    >
                        Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="requestType"
                        value={requestForm.requestType}
                        onChange={handleInput}
                    >
                        <MenuItem value="Oxygen">Oxygen</MenuItem>
                        <MenuItem value="Plasma">Plasma</MenuItem>
                        <MenuItem value="Monetary">Monetary</MenuItem>
                    </Select>
                    {requestForm.requestType === "Monetary" && (
                        <>
                            <TextField
                                id="standard-basic"
                                name="recipientUPIID"
                                className={classes.textField}
                                label="Recipient UPI ID"
                                required
                            />
                            <TextField
                                id="standard-basic"
                                name="recipientUPIName"
                                className={classes.textField}
                                label="Recipient Name "
                                required
                            />
                            <div>
                                <label>
                                    UPI QRcode Image
                                    <input
                                        type="file"
                                        name="QRCodeImage"
                                        required
                                        onChange={handleFile}
                                        className={classes.chooseFile}
                                    />
                                </label>
                            </div>
                        </>
                    )}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            marginTop: 20,
                        }}
                    >
                        <h4>Images to support your request: </h4>
                        <input
                            type="file"
                            name="proofImage"
                            required
                            onChange={handleFile}
                            className={classes.chooseFile}
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
        </div>
    );
}

export default NewRequest;
