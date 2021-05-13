import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    CircularProgress,
    Typography,
    FormControl,
    TextField,
} from "@material-ui/core";
import useUpdateCollectedAmount from "../../hooks/useUpdateCollectedAmount";
import { makeStyles } from "@material-ui/core/styles";

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

export default function UpdateCollectedAmountDialog({
    id,
    open,
    amountCollected,
    handleClose,
}) {
    const classes = useStyles();
    const { handleSubmit, loading, amount, handleChange } =
        useUpdateCollectedAmount(id, amountCollected, handleClose);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Amount Collected</DialogTitle>
                <DialogContent>
                    <form
                        className={classes.container}
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="standard-basic"
                                name="amountNeeded"
                                placeholder="in Rs."
                                className={classes.textField}
                                label="Amount collected so far"
                                onChange={handleChange}
                                value={amount}
                                type="number"
                                required
                            />
                        </FormControl>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                {!loading ? (
                                    "Update"
                                ) : (
                                    <CircularProgress
                                        size={24}
                                        color="secondary"
                                    />
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
