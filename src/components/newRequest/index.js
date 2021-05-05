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
        padding: 10,
        [theme.breakpoints.up("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.up("lg") && theme.breakpoints.up("md")]: {
            width: "auto",
        },
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
                            onChange={(e) => handleFile(e.target.files)}
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
