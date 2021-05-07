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
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
<<<<<<< HEAD
import useStyles from "./styles"; 
import states from "../../constants/states.json";
import cities from"../../constants/cities.json"
=======

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
>>>>>>> upstream/master

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
                        <div style={{ display: "flex", flex: 1, alignItems:"center" }}>
                            <InputLabel id="demo-simple-select-label" style={
                                {marginRight:"10px"}
                                }>
                                    State
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="state"
                                required
                                value={requestForm.state}
                                onChange={handleInput}
                                style={{flex:"1"}}
                            >
                                {
                                    Object.keys(states).map(key=>(
                                        <MenuItem value={key}>{states[key]}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        <div style={{ display: "flex", flex: 1, marginLeft: 16, alignItems:"center" }}>
                        <InputLabel id="demo-simple-select-label" style={
                                {marginRight:"10px"}
                                }>
                                    City
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="city"
                                required
                                value={requestForm.city}
                                onChange={handleInput}
                                style={{flex:"1"}}
                            >
                                {
                                    requestForm.state && cities[requestForm.state].map(city=>(
                                        <MenuItem value={city}>{city}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div >
                    <div style={{ display: "flex", alignItems:"center", marginTop:16}}>

                    <InputLabel id="demo-simple-select-label" style={{
                        marginRight:10
                    }}>Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="requestType"
                        required
                        value={requestForm.requestType}
                        style={{
                            flex:"1"
                        }}
                        onChange={handleInput}
                        >
                        {/* <MenuItem value="Oxygen">Oxygen</MenuItem> */}
                        <MenuItem value="Medical Help">Medical Help</MenuItem>
                        <MenuItem value="Monetary">Monetary</MenuItem>
                    </Select>
                    </div>
<<<<<<< HEAD
                    {
                        requestForm.requestType === "Monetary" && <>
                            <TextField id="standard-basic" name="recipientUPIID" style={{marginTop:10}}
                            label="Recipient UPI ID" onChange={handleInput} required />
                            <TextField id="standard-basic" name="recipientUPIName" style={{marginTop:10}}
                            label="Recipient Name " onChange={handleInput} required />
                            <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            marginTop: 20,
                        }}>
                                <label
                                >
                                    UPI QRcode Image
                                </label>
=======
                    <InputLabel id="demo-simple-select-label" style={
                        {marginTop:"1em"}
                    }>Type</InputLabel>
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
                    {
                        requestForm.requestType === "Monetary" && <>
                            <TextField id="standard-basic" name="recipientUPIID" className={classes.textField}
                            label="Recipient UPI ID" required />
                            <TextField id="standard-basic" name="recipientUPIName" className={classes.textField}
                            label="Recipient Name " required />
                            <div>
                                <label>
                                    UPI QRcode Image
>>>>>>> upstream/master
                                    <input
                                    type="file"
                                    name="QRCodeImage"
                                    required
                                    onChange={handleFile}
<<<<<<< HEAD
                                />
=======
                                    className={classes.chooseFile}
                                />
                                </label>
>>>>>>> upstream/master
                            </div>
                        </>
                    }
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
