import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    Typography,
    CircularProgress,
    FormControl,
    TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useIncrementDonation from "../../hooks/useIncrementDonation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));

export default function PayDialog({
    request,
    open,
    handleClose,
    moneyEntered,
    setMoneyEntered,
}) {
    const classes = useStyles();
    const { handleSubmit, loading, success } = useIncrementDonation(
        request.id,
        moneyEntered
    );

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogContent>
                    <Typography component="h5">
                        UPI ID : {request.recipientUPIID}
                    </Typography>
                    <Typography component="h5">
                        Name : {request.recipientUPIName}
                    </Typography>
                    <img
                        src={request.QRCodeURL}
                        style={{
                            width: "300px",
                        }}
                    />
                    <br />
                    {!success && (
                        <>
                            <br />
                            <Typography
                                variant="body3"
                                style={{ fontWeight: 500 }}
                            >
                                NOTE: Enter only the amount you are going to
                                donate! This will be updated realtime!
                            </Typography>
                            <br />
                            <form
                                className={classes.container}
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="standard-basic"
                                        name="moneyEntered"
                                        placeholder="in Rs."
                                        className={classes.textField}
                                        label="Donation amount"
                                        onChange={(e) =>
                                            setMoneyEntered(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        value={moneyEntered}
                                        type="number"
                                        required
                                    />
                                </FormControl>
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        {!loading ? (
                                            "Proceed"
                                        ) : (
                                            <CircularProgress
                                                size={24}
                                                color="secondary"
                                            />
                                        )}
                                    </Button>
                                </DialogActions>
                            </form>
                        </>
                    )}
                </DialogContent>
                {success && (
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ width: "100%" }}
                        >
                            <a
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    width: "100%",
                                    height: "100%",
                                }}
                                href={`upi://pay?pa=${request.recipientUPIID}&pn=${request.recipientUPIName}&cu=INR`}
                            >
                                pay in App
                            </a>
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}
