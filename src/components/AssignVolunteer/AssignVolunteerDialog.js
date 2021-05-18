import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CircularProgress } from "@material-ui/core";
import useAssignVolunteer from "../../hooks/useAssignVolunteer";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        maxWidth: 280,
        minWidth: 240,
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));

export default function AssignVolunteerDialog({ id, open, handleClose, type }) {
    const classes = useStyles();

    const { volunteer, volunteers, handleChange, handleSubmit, loading } =
        useAssignVolunteer(id, handleClose, type);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Assign Volunteer</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Select Volunteer</InputLabel>
                            <Select
                                value={volunteer.id}
                                onChange={handleChange}
                                input={<Input />}
                            >
                                {volunteers.map((v) => (
                                    <MenuItem key={v.id} value={v.id}>
                                        {v.email}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {!loading ? (
                            "Assign"
                        ) : (
                            <CircularProgress size={24} color="secondary" />
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
