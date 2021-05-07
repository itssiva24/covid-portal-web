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
import useStyles from "./styles"; 
import states from "../../constants/states.json";
import cities from"../../constants/cities.json"

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
                                    <input
                                    type="file"
                                    name="QRCodeImage"
                                    required
                                    onChange={handleFile}
                                />
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
