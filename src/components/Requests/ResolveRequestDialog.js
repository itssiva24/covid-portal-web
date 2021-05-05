import React, { useEffect, useState } from "react";
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
import {
    assignVolunteer,
    getVolunteers,
    resolveRequest,
} from "../../contexts/firebase";
import { CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        width: 280,
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));

export default function ResolveRequestDialog({ id, open, handleClose }) {
    const classes = useStyles();
    const [resolve, setResolve] = useState();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await resolveRequest(id);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Resolve Request</DialogTitle>
                <DialogContent>
                    <Typography component="h5">Are you sure?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {!loading ? (
                            "Resolve"
                        ) : (
                            <CircularProgress size={24} color="secondary" />
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
